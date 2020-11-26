const blogDao = require('../../daos/blog/blogDao');

exports.selectBlogInfo = async (blogJson) => {
    return await blogDao.selectBlogInfo(blogJson);
};