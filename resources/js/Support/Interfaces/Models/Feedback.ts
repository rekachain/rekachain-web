import { FeedbackStatusEnum } from '@/Support/Enums/feedbackStatusEnum';

export interface Feedback {
    id: number;
    user_id?: number;
    name?: string;
    email?: string;
    message: string;
    rating: number;
    status: FeedbackStatusEnum;
    created_at: string;
    updated_at: string;
}
