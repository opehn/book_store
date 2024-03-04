import { RequestHandler } from 'express';
import logger from '../../shared/logger';
import { getServiceInstance } from './like-service';
import { MyResponse } from '../../shared/type'
import { UserToken } from '../../shared/type';
import util from '../../shared/lib/util';

const likeService = getServiceInstance();

const toggleLikeStatus: RequestHandler = async function (req, res, next) {
    const bookId: number = parseInt(req.params.bookId);
    let liked: boolean = util.convertStringtoBoolean(req.query.liked as string);
    const { userId } = req.user as UserToken;
    let response: MyResponse = {};

    try {
        //TODO : 뭔가 이상.. 프론트 하면서 정리 필요 
        const result = await likeService.toggleLikeStatus(userId, bookId, liked);
        response = util.makeResponse(null, null, 'Success');
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json({ error: 'Failed' });
    }
}

export default toggleLikeStatus;
