import { RequestHandler } from 'express';
import logger from '../../shared/logger';
import likeService from './like-service';
import { Response } from '../../shared/type'
import { UserToken } from '../../shared/type';
import util from '../../shared/lib/util';
import likeDb from './like-db'

const toggleLikeStatus: RequestHandler = async function (req, res, next) {
    const bookId: number = parseInt(req.params.bookId);
    let ifLiked: boolean = util.convertStringtoBoolean(req.query.liked as string);
    const { userId } = req.user as UserToken;
    let response: Response = {};
    let result;

    try {
        //TODO : 리턴값 확인해서 예외 정리
        if (ifLiked)
            result = await likeDb.deleteLikedUser(userId);
        else
            result = await likeDb.insertLikedUser(userId, bookId);
        response = util.makeResponse(result, 'Success', null);
        res.status(200).json(response);
    } catch (e: any) {
        logger.reportResponseErr(req.url, req.method, e.message);
        res.status(500).json(util.makeResponse(null, 'Error', e.message));
    }
}

export default toggleLikeStatus;
