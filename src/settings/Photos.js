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
import { uploadProfileImage, deletePhoto } from './actions';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

function Photos(props) {
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const cropper = useRef();

    function handleDrop(acceptedFiles) {
        setPreview(URL.createObjectURL(acceptedFiles[0]));
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
            await props.onImageUpload(image);
            handleCancel();
            toastr.success('Success', 'Image uploaded');
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    }

    function handleCancel() {
        setPreview(null);
        setImage(null);
        setImageUrl(null);
    }

    let { photoURL, photos, onDelete } = props;
    photos = photos.filter(p => p.url !== photoURL);
    console.log(photos);

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
                                <Button
                                    style={{ width: 100 }}
                                    positive
                                    icon="check"
                                    onClick={handleUpload}
                                />
                                <Button
                                    style={{ width: 100 }}
                                    icon="close"
                                    onClick={handleCancel}
                                />
                            </Button.Group>
                        </div>
                    )}
                </Grid.Column>
            </Grid>

            <Divider />
            <Header sub color="teal" content="All Photos" />

            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src={photoURL} />
                    <Button positive>Main Photo</Button>
                </Card>
                {photos &&
                    photos.map((p, i) => (
                        <Card key={i}>
                            <Image src={p.url} />
                            <div className="ui two buttons">
                                <Button basic color="green">
                                    Main
                                </Button>
                                <Button
                                    basic
                                    icon="trash"
                                    color="red"
                                    onClick={onDelete.bind(null, p.name, p.url)}
                                />
                            </div>
                        </Card>
                    ))}
            </Card.Group>
        </Segment>
    );
}

function mapState(state) {
    return {
        uid: state.firebase.auth.uid,
        photoURL: state.firebase.profile.photoURL
    };
}

function mapState2(state) {
    console.log('mapState2');
    const users = state.firestore.ordered.users;
    return {
        photos: users && users.length ? users[0].photos : [],
        photoCount: users && users.length ? users[0].photos.length : 0
    };
}

const dispatchProps = {
    onImageUpload: uploadProfileImage,
    onDelete: deletePhoto
};

function query(props) {
    return props.uid
        ? [
              {
                  collection: 'users',
                  doc: props.uid
              }
          ]
        : [];
}

export default compose(
    connect(
        mapState,
        dispatchProps
    ),
    firestoreConnect(query),
    connect(mapState2)
)(Photos);
