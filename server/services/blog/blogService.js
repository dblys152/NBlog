const blogDao = require('../../daos/blog/blogDao');

exports.selectBlogInfo = async (blogInfoForm) => {
    return await blogDao.selectBlogInfo(blogInfoForm);
};

exports.selectBlogMenuList = async (blogMenuForm) => {
    return await blogDao.selectBlogMenuList(blogMenuForm);
};