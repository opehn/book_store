import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { like } from '../services';
import { Result } from '../shared/type'
import { UserToken } from '../shared/type';

//TODO : user 인터페이스 추가
const likeController: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    const bookId: number = parseInt(req.params.bookId);
    const { liked } = req.query;
    const { userId } = req.user as UserToken;
    let ifLiked: boolean;
    let result: Result = {};

    if (liked === 'true')
        ifLiked = true;
    else
        ifLiked = false;
    try {
        like.toggleLikeStatus(userId, bookId, ifLiked);
        result.message = 'Success';
        logger.reportResponse(req.url, req.method, result);
        res.status(200).json(result);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(e.message);
    }
}

export default likeController;
