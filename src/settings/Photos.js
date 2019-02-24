import React, { useState, useRef } from 'react';
import {
    Image,
    Segment,
    Header,
    Divider,
    Grid,
    Button,
    Card,
    Icon
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { uploadProfileImage } from './actions';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

function Photos(props) {
    const [filename, setFilename] = useState(null);
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const cropper = useRef();

    function handleDrop(acceptedFiles) {
        setPreview(URL.createObjectURL(acceptedFiles[0]));
        console.log(acceptedFiles[0]);
        setFilename(acceptedFiles[0].name);
    }

    function handleCrop() {
        if (typeof cropper.current.getCroppedCanvas() === 'undefined') return;
        cropper.current.getCroppedCanvas().toBlob(blob => {
            setImage(blob);
            setImageUrl(URL.createObjectURL(blob));
        }, 'image/jpeg');
    }

    async function handleUpload() {
        try {
            await props.onImageUpload(image, filename);
            handleCancel();
            toastr.success('Success', 'Image uploaded');
        }
        catch(error) {
            toastr.error('Oops', error.message);
        }
    }

    function handleCancel() {
        setFilename(null);
        setPreview(null);
        setImage(null);
        setImageUrl(null);
    }

    return (
        <Segment>
            <Header dividing size="large" content="Your Photos" />
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color="teal" sub content="Step 1 - Add Photo" />
                    <Dropzone multiple={false} onDrop={handleDrop}>
                        {({ getRootProps, getInputProps }) => {
                            return (
                                <div
                                    style={{
                                        padding: 20,
                                        marginTop: 10,
                                        textAlign: 'center'
                                    }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <Icon name="upload" size="huge" />
                                    <Header content="Drop image here or click to Add" />
                                </div>
                            );
                        }}
                    </Dropzone>
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color="teal" content="Step 2 - Resize image" />
                    {preview && (
                        <Cropper
                            style={{ width: '100%', height: 200 }}
                            ref={cropper}
                            src={preview}
                            aspectRatio={1}
                            dragMode="move"
                            guides={false}
                            scalable
                            cropBoxMovable
                            cropBoxResizable
                            crop={handleCrop}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header
                        sub
                        color="teal"
                        content="Step 3 - Preview and Upload"
                    />
                    {preview && imageUrl && (
                        <div>
                            <Image
                                style={{
                                    minWidth: '200px',
                                    minHeight: '200px'
                                }}
                                src={imageUrl}
                            />
                            <Button.Group>
                                <Button style={{ width: 100 }} positive icon="check" onClick={handleUpload} />
                                <Button style={{ width: 100 }} icon="close" onClick={handleCancel} />
                            </Button.Group>
                        </div>
                    )}
                </Grid.Column>
            </Grid>

            <Divider />
            <Header sub color="teal" content="All Photos" />

            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
                    <Button positive>Main Photo</Button>
                </Card>

                <Card>
                    <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
                    <div className="ui two buttons">
                        <Button basic color="green">
                            Main
                        </Button>
                        <Button basic icon="trash" color="red" />
                    </div>
                </Card>
            </Card.Group>
        </Segment>
    );
}

const dispatchProps = {
    onImageUpload: uploadProfileImage
};

export default connect(
    null,
    dispatchProps
)(Photos);
