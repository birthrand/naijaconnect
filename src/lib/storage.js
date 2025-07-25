import { supabase } from './supabase';
import { cloudinaryHelpers, imageOptimization, CLOUDINARY_PRESETS } from './cloudinary';

// Storage bucket names
export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  POSTS: 'posts',
  LISTINGS: 'listings',
};

// File upload helper functions
export const storageHelpers = {
  // Upload user avatar
  async uploadAvatar(userId, file, fileName = null) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileNameWithExt = fileName || `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileNameWithExt}`;

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKETS.AVATARS)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKETS.AVATARS)
        .getPublicUrl(filePath);

      // Generate Cloudinary optimized URLs
      const publicId = this.extractPublicId(publicUrl);
      const optimizedUrls = {
        thumbnail: cloudinaryHelpers.getAvatarUrl(publicId, 'THUMBNAIL'),
        small: cloudinaryHelpers.getAvatarUrl(publicId, 'SMALL'),
        medium: cloudinaryHelpers.getAvatarUrl(publicId, 'MEDIUM'),
        large: cloudinaryHelpers.getAvatarUrl(publicId, 'LARGE'),
      };

      return { data, publicUrl, optimizedUrls, error: null };
    } catch (error) {
      return { data: null, publicUrl: null, optimizedUrls: null, error };
    }
  },

  // Upload post image
  async uploadPostImage(userId, file, postId = null) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = postId 
        ? `${postId}-${Date.now()}.${fileExt}`
        : `${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKETS.POSTS)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKETS.POSTS)
        .getPublicUrl(filePath);

      // Generate Cloudinary optimized URLs
      const publicId = this.extractPublicId(publicUrl);
      const optimizedUrls = {
        thumbnail: cloudinaryHelpers.getPostImageUrl(publicId, 'THUMBNAIL'),
        small: cloudinaryHelpers.getPostImageUrl(publicId, 'SMALL'),
        medium: cloudinaryHelpers.getPostImageUrl(publicId, 'MEDIUM'),
        large: cloudinaryHelpers.getPostImageUrl(publicId, 'LARGE'),
      };

      const srcSet = imageOptimization.generateSrcSet(publicId, 'POST');

      return { data, publicUrl, optimizedUrls, srcSet, error: null };
    } catch (error) {
      return { data: null, publicUrl: null, optimizedUrls: null, srcSet: null, error };
    }
  },

  // Upload listing images
  async uploadListingImages(userId, files, listingId = null) {
    try {
      const uploadPromises = files.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = listingId 
          ? `${listingId}-${index}-${Date.now()}.${fileExt}`
          : `${index}-${Date.now()}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        const { data, error } = await supabase.storage
          .from(STORAGE_BUCKETS.LISTINGS)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(STORAGE_BUCKETS.LISTINGS)
          .getPublicUrl(filePath);

        // Generate Cloudinary optimized URLs
        const publicId = this.extractPublicId(publicUrl);
        const optimizedUrls = {
          thumbnail: cloudinaryHelpers.getListingImageUrl(publicId, 'THUMBNAIL'),
          small: cloudinaryHelpers.getListingImageUrl(publicId, 'SMALL'),
          medium: cloudinaryHelpers.getListingImageUrl(publicId, 'MEDIUM'),
          large: cloudinaryHelpers.getListingImageUrl(publicId, 'LARGE'),
        };

        return { publicUrl, optimizedUrls };
      });

      const results = await Promise.all(uploadPromises);
      return { data: results, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete file
  async deleteFile(bucket, filePath) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get file URL
  getFileUrl(bucket, filePath) {
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return publicUrl;
  },

  // Get optimized file URL with Cloudinary
  getOptimizedFileUrl(bucket, filePath, size = 'MEDIUM', type = 'POST') {
    const publicUrl = this.getFileUrl(bucket, filePath);
    const publicId = this.extractPublicId(publicUrl);
    
    switch (type) {
      case 'AVATAR':
        return cloudinaryHelpers.getAvatarUrl(publicId, size);
      case 'LISTING':
        return cloudinaryHelpers.getListingImageUrl(publicId, size);
      case 'POST':
      default:
        return cloudinaryHelpers.getPostImageUrl(publicId, size);
    }
  },

  // List files in a folder
  async listFiles(bucket, folder = '') {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Extract public ID from Supabase storage URL
  extractPublicId(url) {
    if (!url) return null;
    
    // Extract the file path from Supabase storage URL
    const urlParts = url.split('/');
    const bucketIndex = urlParts.findIndex(part => part === 'storage');
    if (bucketIndex === -1) return null;
    
    // Get the path after the bucket name
    const pathParts = urlParts.slice(bucketIndex + 2);
    const filePath = pathParts.join('/');
    
    // Remove file extension for Cloudinary public ID
    return filePath.split('.')[0];
  },

  // Get responsive image URLs for any file
  getResponsiveUrls(bucket, filePath, type = 'POST') {
    const publicUrl = this.getFileUrl(bucket, filePath);
    const publicId = this.extractPublicId(publicUrl);
    
    if (!publicId) return null;
    
    return {
      original: publicUrl,
      thumbnail: cloudinaryHelpers.getOptimizedImageUrl(publicId, CLOUDINARY_PRESETS[type].THUMBNAIL),
      small: cloudinaryHelpers.getOptimizedImageUrl(publicId, CLOUDINARY_PRESETS[type].SMALL),
      medium: cloudinaryHelpers.getOptimizedImageUrl(publicId, CLOUDINARY_PRESETS[type].MEDIUM),
      large: cloudinaryHelpers.getOptimizedImageUrl(publicId, CLOUDINARY_PRESETS[type].LARGE),
      srcSet: imageOptimization.generateSrcSet(publicId, type),
    };
  },
};

// Image optimization helpers
export const imageHelpers = {
  // Generate optimized image URL with transformations
  getOptimizedImageUrl(url, options = {}) {
    if (!url) return null;
    
    // If it's already a Cloudinary URL, return as is
    if (url.includes('cloudinary.com')) {
      return url;
    }
    
    // If it's a Supabase URL, convert to Cloudinary
    const publicId = storageHelpers.extractPublicId(url);
    if (publicId) {
      return cloudinaryHelpers.getOptimizedImageUrl(publicId, options.transformations, options);
    }
    
    return url;
  },

  // Validate image file
  validateImageFile(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    
    if (file.size > maxSize) {
      return { valid: false, error: 'File size must be less than 5MB' };
    }
    
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File must be an image (JPEG, PNG, WebP, or GIF)' };
    }
    
    return { valid: true, error: null };
  },

  // Compress image before upload (client-side)
  async compressImage(file, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        }, file.type, quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  },

  // Get lazy loading URLs
  getLazyLoadUrls(url, placeholderSize = 'THUMBNAIL', type = 'POST') {
    const publicId = storageHelpers.extractPublicId(url);
    if (!publicId) return { placeholder: url, full: url };
    
    return imageOptimization.getLazyLoadUrl(publicId, placeholderSize);
  },

  // Get optimal size based on screen width
  getOptimalSize(screenWidth, type = 'POST') {
    return imageOptimization.getOptimalSize(screenWidth, type);
  },
};

export default storageHelpers; 