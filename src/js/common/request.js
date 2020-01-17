import Ajax from './ajax';

const Request = {
    // demo
    // Link: {
    //     List(param) {
    //         return Ajax.get('/link', param);
    //     },
    //     Create(param) {
    //         return Ajax.postJson('/link', param);
    //     },
    //     Edit(param) {
    //         return Ajax.get('/link/' + param.id);
    //     },
    //     Update(param) {
    //         return Ajax.putJson('/link/' + param.id, param);
    //     },
    //     Delete(param) {
    //         return Ajax.delete('/link/' + param.id, param);
    //     }
    // },
    User: {
        info() {
            return Ajax.get('/user');
        }
    },
    Login: {
        login(param) {
            return Ajax.postJson('/login', param);
        }
    },
    Setting: {
        Get() {
            return Ajax.get('/setting');
        },
        Save(param) {
            return Ajax.postJson('/setting', param);
        }
    },

    VideoUpload: {
        AliyunAuthTokenRefresh(param) {
            return Ajax.postJson('/video/token/aliyun/refresh', param);
        },
        AliyunAuthTokenCreate(param) {
            return Ajax.postJson('/video/token/aliyun/create', param);
        },
        TencentAuthToken(param) {
            return Ajax.postJson('/video/token/tencent', param);
        }
    }
};

export default Request;