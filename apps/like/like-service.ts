import { LikeRepository, getRepoInstance } from './like-db';

export class LikeService {
    private likeRepository;

    constructor(likeRepository: LikeRepository) {
        this.likeRepository = likeRepository;
    }

    async toggleLikeStatus(userId: number, bookId: number, liked: boolean): Promise<number | number[]> {
        try {
            if (liked)
                return await this.likeRepository.insertLikedUser(userId, bookId);
            else
                return await this.likeRepository.deleteLikedUser(userId);
        } catch (e) {
            throw e;
        }
    }
}

export function getServiceInstance() {
    return new LikeService(getRepoInstance());
}