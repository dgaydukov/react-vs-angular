/**
 * Created by diman on 06.06.17.
 */
"use strict";
var Post = (function () {
    function Post(id, userId, title, body) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.body = body;
    }
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=post.js.map