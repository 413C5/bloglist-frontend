import React from "react";
import Blog from "./Blog";

const ShowBlogs = ({ blogs }) => {
    return (
        blogs.map(blog => {
            return (
                <Blog key={blog.id} blog={blog} />
            )
        })
    )
}

export default ShowBlogs