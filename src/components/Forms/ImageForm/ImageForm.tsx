import React from 'react';
import './ImageForm.scss';
import ImageUploader from 'react-images-upload';

type imageFormProps = {}

class ImageForm extends React.Component<imageFormProps, { pictures: any }> {
    constructor(props: imageFormProps) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture: any) {
        console.log(picture);
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
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