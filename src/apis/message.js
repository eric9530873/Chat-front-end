import { apiHelper } from "@/utils/helpers";

export default {
    getMessages() {
        return apiHelper.get('/messages')
    }
}