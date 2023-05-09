import React from "react";
import ShowBlogs from "./ShowBlogs";

const BlogForm = ({
    handleBlogCreation,
    user,
    handleLogout,
    title,
    handleTitleChange,
    author,
    handleAuhtorChange,
    url,
    handleUrlChange,
    blogs
}) => {
    return (
        <div>
            <form onSubmit={handleBlogCreation}>
                <h1>blogs</h1>
                {/* Logout */}
                <div>
                    <p>
                        {user.name} logged in <button onClick={handleLogout}>logout</button>
                    </p>
                </div>
                {/* Add blogs */}
                <div>
                    <h1>create new</h1>
                    title:
                    <input type="text" value={title} name="title" onChange={handleTitleChange} />
                    <br />
                    author:
                    <input type="text" value={author} name="author" onChange={handleAuhtorChange} />
                    <br />
                    url:
                    <input type="text" value={url} name="url" onChange={handleUrlChange} />
                    <br />
                    <button type="submit">create </button>
                </div>
                <div>
                    <ShowBlogs blogs={blogs} />
                </div>
            </form>
        </div>
    )
}

export default BlogForm