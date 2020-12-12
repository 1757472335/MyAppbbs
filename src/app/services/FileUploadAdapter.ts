import { APP_SERVE, QNY_IMG_API } from '../provider/constant'
import { QNY_SERVER } from '../provider/constant'



export class FileUploadAdapter {
    public loader: any;
    public api: any;
    public http: any;
    public noplugService:any
    constructor(
        loader: any, 
        http: any,  
        ) {
        
        // 初始化
        this.loader = loader;
        this.api = '/upload/uploadimg'
        // this.api = '/art/updateimg'   
        this.http = http;
    }
    upload() {
        // 上传文件   

        return new Promise((resolve, reject) => {
            const data = new FormData();

           
            this.loader.file.then((res) => { 

                console.log("res",res)
                data.append('file', res);
                console.log("data",data)
                let da = this.http.post(this.api, data)
                da.subscribe((data: any) => {
                    console.log(data)

                    if (data.code == 200) {
                        if((data.data.imgDir).search(".gif")){
                            resolve({ default: QNY_SERVER + data.data.imgDir});
                        }
                        resolve({ default: QNY_SERVER + data.data.imgDir + QNY_IMG_API });
                    } else {
                        reject(data.msg);
                    }
                })

            })

        })
    }



    public abort() {
        // 上传失败
        console.log("失败")
    }

}