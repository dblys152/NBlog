const blogDao = require('../../daos/blog/blogDao');

const selectBlogInfo = async (blogJson) => {
    return await blogDao.selectBlogInfo(blogJson);
}
exports.selectBlogInfo = selectBlogInfo;