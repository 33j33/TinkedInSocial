import { storage } from "../common/firebase";


export default class MediaServie {

    static uploadImage = ({form, setImage, dest}) => async (options) => {
        const { onSuccess, onError, file, onProgress } = options;
        setImage(file);
    
        const uploadTask = storage.ref(`${dest}/${file.name}`).put(file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            onProgress({ percent: progress })
          },
          error => {
            console.log(error);
            onError(error);
          },
          () => {
            storage
              .ref(`${dest}`)
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                form.setFieldsValue({imgUrl: url})
                onSuccess(url);
                console.log("url", url)
              });
          }
        );
      };

}
