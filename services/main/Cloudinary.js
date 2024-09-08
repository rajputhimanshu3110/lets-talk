import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const Upload = (image) => {
    cloudinary.v2.uploader
        .upload(image, {
            use_filename: true
        })
        .then(result => console.log(result));
};

export default Upload