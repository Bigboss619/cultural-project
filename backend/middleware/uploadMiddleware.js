const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Base uploads directory
const uploadsBaseDir = path.join(__dirname, '..', 'uploads');

// Helper to get subdirectory from baseUrl (e.g., /api/testimonials -> testimonial)
function getSubDirectory(req) {
  const baseUrl = req.baseUrl || '';
  if (baseUrl.includes('/testimonial')) return 'testimonial';
  if (baseUrl.includes('/executive')) return 'executive';
  if (baseUrl.includes('/post')) return 'blog';
  if (baseUrl.includes('/blog')) return 'blog';
  if (baseUrl.includes('/gallery')) return 'gallery';
  if (baseUrl.includes('/member')) return 'members';
  return 'misc';
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subDir = getSubDirectory(req);
    const targetDir = path.join(uploadsBaseDir, subDir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

module.exports = upload;