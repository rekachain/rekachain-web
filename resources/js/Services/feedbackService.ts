import { ROUTES } from '@/Support/Constants/routes';
import { serviceFactory } from '@/Services/serviceFactory';
import { FeedbackResource } from '@/Support/Interfaces/Resources';

export const feedbackService = {
    ...serviceFactory<FeedbackResource>(ROUTES.FEEDBACKS),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};