 /** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["res.cloudinary.com","lh3.googleusercontent.com"]
    },
    env:{
        FRONTEND_STORE_URL:process.env.FRONTEND_STORE_URL
    }

    
};

export default nextConfig;
