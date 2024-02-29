/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const imgLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    overflow: hidden;

    &> img {
        width: 100%;
    }

`


function ImageEx3(props) {

    const [ newfile, setnewfile ] = useState([]);
    const imgdata = useRef();
    const uploadFilesId = useRef(0);



    const handleimginputchange = (e) => {
        const { files } = e.target;
        const fileArray = Array.from(files);

        if(fileArray.length === 0) {
            return;
        }

        let promises = [];

        promises = fileArray.map(file => new Promise(reslove => {
            const loadImage = {
                id: uploadFilesId.current += 1,
                file,
                dataURL: ""
            }

            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                reslove({
                    ...loadImage,
                    dataURL: e.target.result
                });           
            };
            

            fileReader.readAsDataURL(file);
        }))

        Promise.all(promises)
        .then(result => {
            setnewfile(result);
        });

    }



    return (
        <div css={layout}>
            <div css={imgLayout}>
                    <img src="" alt="" />
            </div>
            {
                newfile.map(file => 
                    <div key={file.id} css={imgLayout}>
                        <img src={file.dataURL} alt={file.file.name} />
                    </div>
                )
            }
            <input type="file" style={{display:"none"}} multiple={true} ref={imgdata} onChange={handleimginputchange}/>
            <button onClick={() => imgdata.current.click()}>불러오기</button>
        </div>
    );
}

export default ImageEx3;