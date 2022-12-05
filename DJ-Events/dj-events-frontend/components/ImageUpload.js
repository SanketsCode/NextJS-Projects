
import styles from '@/styles/Form.module.css';
import { useState } from 'react';
import { API_URL } from '../config';

export default function ImageUpload({evtId,imageUploaded}) {
    const [image,setImage] = useState(null);
    // console.log(evtId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', image)
        formData.append('ref', 'api::myevents.myevents')
        formData.append('refId', evtId*1)
        formData.append('field', 'image') 

        const res = await fetch(`${API_URL}/api/upload`,{
            method:'POST',
            body:formData
        })

        if(res.ok){
            imageUploaded();
        }else{
            // console.log(res);
            console.log("We got the error while uploading");
        }
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

  return (
    <div className={styles.form}>
        <h1>Upload Event Image</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.file}>
                <input
                type="file"
                onChange={handleFileChange}
                />

            </div>
            <input type="submit" value="Upload" className="btn" />
        </form>
    </div>
  )
}
