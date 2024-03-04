import { CategoryRepository, getRepoInstance } from './category-db';
import { Category } from '../types';

export class CategoryService {
    private categoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async getAllCategory() {
        try {
            return await this.categoryRepository.selectCategoryAll();
        } catch (e) {
            throw e;
        }
    }


}

export function getServiceInstance() {
    return new CategoryService(getRepoInstance());
}