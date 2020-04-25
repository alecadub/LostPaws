import React from 'react';
import './ImageForm.scss';
import ImageUploader from 'react-images-upload';

type imageFormProps = {
    setImgSrc: (picture: any) => void
}

class ImageForm extends React.Component<imageFormProps, { pictures: any }> {

    constructor(props: imageFormProps) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture: any) {
        this.setImgSrc(picture);
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    public async setImgSrc(picture: any) {
        const files = picture;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'apu_preset');
        const res = await fetch('https://api.cloudinary.com/v1_1/apu-cloud/image/upload', {
            method: 'POST',
            body: data
        })
        const file = await res.json();
        this.props.setImgSrc(file.secure_url);
    }

    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Upload Your Pet Photo!'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
            />
        );
    }
}

export default ImageForm;