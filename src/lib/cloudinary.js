// Cloudinary configuration and helper functions
const CLOUDINARY_CLOUD_NAME = 'dxcuuzxu4'; // You'll need to set this
const CLOUDINARY_API_KEY = '948579889985519';

// Cloudinary transformation presets
export const CLOUDINARY_PRESETS = {
  // Avatar transformations
  AVATAR: {
    THUMBNAIL: 'w_100,h_100,c_fill,g_face,f_auto',
    SMALL: 'w_200,h_200,c_fill,g_face,f_auto',
    MEDIUM: 'w_400,h_400,c_fill,g_face,f_auto',
    LARGE: 'w_800,h_800,c_fill,g_face,f_auto',
  },
  
  // Post image transformations
  POST: {
    THUMBNAIL: 'w_300,h_200,c_fill,f_auto',
    SMALL: 'w_600,h_400,c_fill,f_auto',
    MEDIUM: 'w_1200,h_800,c_fill,f_auto',
    LARGE: 'w_1600,h_1200,c_fill,f_auto',
  },
  
  // Listing image transformations
  LISTING: {
    THUMBNAIL: 'w_200,h_200,c_fill,f_auto',
    SMALL: 'w_400,h_400,c_fill,f_auto',
    MEDIUM: 'w_800,h_800,c_fill,f_auto',
    LARGE: 'w_1200,h_1200,c_fill,f_auto',
  },
  
  // General transformations
  GENERAL: {
    WEBP: 'f_webp,q_auto',
    JPEG: 'f_jpg,q_auto',
    PNG: 'f_png,q_auto',
    BLUR: 'e_blur:1000',
    BRIGHTNESS: 'e_brightness:10',
    CONTRAST: 'e_contrast:10',
    SATURATION: 'e_saturation:50',
  },
};

// Cloudinary helper functions
export const cloudinaryHelpers = {
  // Get optimized image URL with transformations
  getOptimizedImageUrl(publicId, transformations = '', options = {}) {
    if (!publicId) return null;
    
    const {
      cloudName = CLOUDINARY_CLOUD_NAME,
      format = 'auto',
      quality = 'auto',
      deliveryType = 'upload'
    } = options;

    // Build transformation string
    let transformString = transformations;
    
    // Add format if specified
    if (format && format !== 'auto') {
      transformString += `,f_${format}`;
    }
    
    // Add quality if specified
    if (quality && quality !== 'auto') {
      transformString += `,q_${quality}`;
    }

    // Build URL
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/${deliveryType}`;
    const transformPath = transformString ? `/${transformString}` : '';
    
    return `${baseUrl}${transformPath}/${publicId}`;
  },

  // Get avatar URL with different sizes
  getAvatarUrl(publicId, size = 'MEDIUM') {
    const transformations = CLOUDINARY_PRESETS.AVATAR[size];
    return this.getOptimizedImageUrl(publicId, transformations);
  },

  // Get post image URL with different sizes
  getPostImageUrl(publicId, size = 'MEDIUM') {
    const transformations = CLOUDINARY_PRESETS.POST[size];
    return this.getOptimizedImageUrl(publicId, transformations);
  },

  // Get listing image URL with different sizes
  getListingImageUrl(publicId, size = 'MEDIUM') {
    const transformations = CLOUDINARY_PRESETS.LISTING[size];
    return this.getOptimizedImageUrl(publicId, transformations);
  },

  // Generate responsive image URLs
  getResponsiveImageUrls(publicId, sizes = ['THUMBNAIL', 'SMALL', 'MEDIUM', 'LARGE']) {
    return sizes.map(size => ({
      size,
      url: this.getOptimizedImageUrl(publicId, CLOUDINARY_PRESETS.POST[size])
    }));
  },

  // Apply filters and effects
  applyFilter(publicId, filter, options = {}) {
    const transformations = CLOUDINARY_PRESETS.GENERAL[filter] || filter;
    return this.getOptimizedImageUrl(publicId, transformations, options);
  },

  // Create image with overlay (for badges, watermarks, etc.)
  addOverlay(publicId, overlayPublicId, position = 'south_east', options = {}) {
    const overlayTransform = `l_${overlayPublicId},g_${position}`;
    return this.getOptimizedImageUrl(publicId, overlayTransform, options);
  },

  // Create placeholder image
  getPlaceholderUrl(width = 400, height = 300, text = 'No Image') {
    const transformations = `w_${width},h_${height},c_fill,co_rgb:666666,l_text:Arial_24:${text}`;
    return this.getOptimizedImageUrl('sample', transformations);
  },
};

// Image optimization utilities
export const imageOptimization = {
  // Get optimal image size based on screen size
  getOptimalSize(screenWidth, type = 'POST') {
    if (screenWidth < 480) return 'THUMBNAIL';
    if (screenWidth < 768) return 'SMALL';
    if (screenWidth < 1024) return 'MEDIUM';
    return 'LARGE';
  },

  // Generate srcset for responsive images
  generateSrcSet(publicId, type = 'POST') {
    const sizes = ['THUMBNAIL', 'SMALL', 'MEDIUM', 'LARGE'];
    const breakpoints = [480, 768, 1024, 1600];
    
    return sizes.map((size, index) => {
      const url = cloudinaryHelpers.getOptimizedImageUrl(
        publicId, 
        CLOUDINARY_PRESETS[type][size]
      );
      return `${url} ${breakpoints[index]}w`;
    }).join(', ');
  },

  // Lazy loading helper
  getLazyLoadUrl(publicId, placeholderSize = 'THUMBNAIL') {
    return {
      placeholder: cloudinaryHelpers.getOptimizedImageUrl(
        publicId, 
        CLOUDINARY_PRESETS.POST[placeholderSize] + ',e_blur:1000'
      ),
      full: cloudinaryHelpers.getOptimizedImageUrl(publicId),
    };
  },
};

// React hook for Cloudinary
export const useCloudinary = () => {
  return {
    getOptimizedImageUrl: cloudinaryHelpers.getOptimizedImageUrl,
    getAvatarUrl: cloudinaryHelpers.getAvatarUrl,
    getPostImageUrl: cloudinaryHelpers.getPostImageUrl,
    getListingImageUrl: cloudinaryHelpers.getListingImageUrl,
    getResponsiveImageUrls: cloudinaryHelpers.getResponsiveImageUrls,
    applyFilter: cloudinaryHelpers.applyFilter,
    addOverlay: cloudinaryHelpers.addOverlay,
    getPlaceholderUrl: cloudinaryHelpers.getPlaceholderUrl,
    getOptimalSize: imageOptimization.getOptimalSize,
    generateSrcSet: imageOptimization.generateSrcSet,
    getLazyLoadUrl: imageOptimization.getLazyLoadUrl,
  };
};

// Update storage helpers to use Cloudinary
export const updateStorageHelpers = (storageHelpers) => {
  return {
    ...storageHelpers,
    
    // Enhanced upload functions with Cloudinary optimization
    async uploadAvatarWithOptimization(userId, file, fileName = null) {
      const result = await storageHelpers.uploadAvatar(userId, file, fileName);
      
      if (result.publicUrl) {
        // Extract public ID from Supabase URL and optimize with Cloudinary
        const publicId = this.extractPublicId(result.publicUrl);
        return {
          ...result,
          optimizedUrls: {
            thumbnail: cloudinaryHelpers.getAvatarUrl(publicId, 'THUMBNAIL'),
            small: cloudinaryHelpers.getAvatarUrl(publicId, 'SMALL'),
            medium: cloudinaryHelpers.getAvatarUrl(publicId, 'MEDIUM'),
            large: cloudinaryHelpers.getAvatarUrl(publicId, 'LARGE'),
          }
        };
      }
      
      return result;
    },

    async uploadPostImageWithOptimization(userId, file, postId = null) {
      const result = await storageHelpers.uploadPostImage(userId, file, postId);
      
      if (result.publicUrl) {
        const publicId = this.extractPublicId(result.publicUrl);
        return {
          ...result,
          optimizedUrls: {
            thumbnail: cloudinaryHelpers.getPostImageUrl(publicId, 'THUMBNAIL'),
            small: cloudinaryHelpers.getPostImageUrl(publicId, 'SMALL'),
            medium: cloudinaryHelpers.getPostImageUrl(publicId, 'MEDIUM'),
            large: cloudinaryHelpers.getPostImageUrl(publicId, 'LARGE'),
          },
          srcSet: imageOptimization.generateSrcSet(publicId, 'POST'),
        };
      }
      
      return result;
    },

    // Extract public ID from Supabase storage URL
    extractPublicId(url) {
      // This is a simplified extraction - you might need to adjust based on your URL structure
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      return fileName.split('.')[0]; // Remove file extension
    },
  };
};

export default cloudinaryHelpers; 