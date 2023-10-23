import { apiHelper } from "@/utils/helpers";

export default {
    fetchResumes() {
        return apiHelper.get('/resumes')
    }
}