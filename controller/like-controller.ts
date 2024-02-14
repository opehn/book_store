import { RequestHandler } from 'express';
import logger from '../shared/logger';
import { like } from '../services';

//TODO : user 인터페이스 추가
const likeController: RequestHandler = async function (req, res, next) {
    logger.reportRequest(req.url, req.method);
    const bookId: number = parseInt(req.params.bookId);
    const { liked } = req.query;
    const { userId } = req.user;
    let ifLiked: boolean;

    if (liked === 'true')
        ifLiked = true;
    else
        ifLiked = false;
    try {
        let result = like.toggleLikeStatus(userId, bookId, ifLiked);
        result.message = 'Success';
        logger.reportResponse(req.url, req.method, result);
        res.status(200).json(result);
    } catch (e) {
        logger.reportResponseErr(req.url, req.method, e);
        res.status(500).json({ message: "Server Error" });
    }
}

export default likeController;
