import { Cloudinary } from '@cloudinary/url-gen';
import { scale, fill } from '@cloudinary/url-gen/actions/resize';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { opacity } from '@cloudinary/url-gen/actions/adjust';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

// Initialize Cloudinary instance
const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    },
    url: {
        secure: true // Use HTTPS
    }
});

/**
 * Get a Cloudinary image URL with optional watermark
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {Object} options - Configuration options
 * @param {boolean} options.watermark - Whether to add watermark
 * @param {string} options.watermarkType - 'text' or 'image'
 * @param {string} options.watermarkText - Text for text watermark
 * @param {number} options.width - Desired width
 * @param {number} options.height - Desired height
 * @returns {string} Cloudinary URL
 */
export const getImageUrl = (publicId, options = {}) => {
    const {
        watermark = true,
        watermarkType = 'text',
        watermarkText = '© ECN News',
        width = null,
        height = null,
        roundCorners = false
    } = options;

    // Start with the image
    let image = cld.image(publicId);

    // Apply resize if dimensions provided
    if (width && height) {
        image = image.resize(fill().width(width).height(height));
    } else if (width) {
        image = image.resize(scale().width(width));
    } else if (height) {
        image = image.resize(scale().height(height));
    }

    // Add watermark if requested
    if (watermark) {
        if (watermarkType === 'text') {
            // Text watermark [citation:2]
            image = image.overlay(
                source(
                    text(watermarkText, new TextStyle('Arial', 40))
                        .textColor('white')
                        .transformation(
                            new Transformation().adjust(opacity(50))
                        )
                ).position(
                    new Position()
                        .gravity(compass('south_east'))
                        .offsetX(20)
                        .offsetY(20)
                )
            );
        } else if (watermarkType === 'image') {
            // Image watermark (logo)
            image = image.overlay(
                source('watermark_logo') // You'll upload your logo with this public ID
                    .transformation(
                        new Transformation()
                            .resize(scale().width(100))
                            .adjust(opacity(60))
                    )
                    .position(
                        new Position()
                            .gravity(compass('south_east'))
                            .offsetX(10)
                            .offsetY(10)
                    )
            );
        }
    }

    // Add rounded corners if requested
    if (roundCorners) {
        image = image.roundCorners(byRadius(8));
    }

    // Optimize delivery [citation:2]
    image = image
        .delivery(format(autoFormat()))
        .delivery(quality(autoQuality()));

    return image.toURL();
};

/**
 * Get a thumbnail URL (for article cards, sidebar, etc.)
 */
export const getThumbnailUrl = (publicId, width = 400, height = 250) => {
    return getImageUrl(publicId, {
        width,
        height,
        watermark: true,
        watermarkType: 'text',
        watermarkText: '© ECN News',
        roundCorners: true
    });
};

/**
 * Get a slider image URL (large, featured)
 */
export const getSliderImageUrl = (publicId) => {
    return getImageUrl(publicId, {
        width: 1200,
        height: 500,
        watermark: true,
        watermarkType: 'text',
        watermarkText: '© ECN News'
    });
};

/**
 * Get a full-size article image URL
 */
export const getArticleImageUrl = (publicId) => {
    return getImageUrl(publicId, {
        width: 800,
        height: 400,
        watermark: true,
        watermarkType: 'text',
        watermarkText: '© ECN News'
    });
};

/**
 * Upload an image to Cloudinary (to be used in admin panel)
 * Note: This requires server-side implementation with API Secret
 */
export const uploadImage = async (file, folder = 'news') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // You'll create this
    formData.append('folder', folder);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );
        const data = await response.json();
        return {
            publicId: data.public_id,
            url: data.secure_url,
            width: data.width,
            height: data.height
        };
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
};