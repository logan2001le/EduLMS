import axiosClient from "./axiosClient";

const contractManagementApi = {
    async listContract() {
        const url = 'contracts';
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async createContract(data) {
        const url = 'contracts';
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async updateContract(data, id) {
        const url = 'contracts/' + id;
        try {
            const response = await axiosClient.put(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async searchContract(name) {
        const url = 'contracts/search?keyword=' + name.target.value;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async deleteContract(id) {
        const url = 'contracts/' + id;
        try {
            const response = await axiosClient.delete(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getDetailContract(id) {
        const url = 'contracts/' + id;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async addTeacherToContract(contractId, teacherId) {
        const url = `contracts/teachers/${contractId}`; 
        try {
            const response = await axiosClient.post(url, { teacherId });
            return response;
        } catch (error) {
            throw error;
        }
    },
    
    async addStudentToContract(contractId, studentId) {
        const url = `contracts/students/${contractId}`;
        try {
            const response = await axiosClient.post(url, { studentId });
            return response;
        } catch (error) {
            throw error;
        }
    },

    async getAllStudentsInContract(contractId) {
        const url = `contracts/students/${contractId}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async addReview(contractId, data) {
        const url = `contracts/reviews/${contractId}`;
        try {
            const response = await axiosClient.post(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async getReviews(contractId) {
        const url = `contracts/reviews/${contractId}`;
        try {
            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    }
    
}

export default contractManagementApi;
