import axios from "axios";
import { useState } from "react"

function UploadVideo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");

    function handleVideo(e) {
        const videoFile = e.target.files[0];
        console.log(videoFile);
        if (videoFile && videoFile.type.startsWith("video/")) {
            setVideo(videoFile);
            console.log("video", videoFile);
        } else {
            alert("Please upload a valid video file.");
        }
    }

    function handleThumbnail(e) {
        const thumbnailFile = e.target.files[0];
        console.log(thumbnailFile);
        if (thumbnailFile && thumbnailFile.type.startsWith("image/")) {
            setThumbnail(thumbnailFile);
            setImage(URL.createObjectURL(thumbnailFile));
        } else {
            alert("Please upload a valid image file.");
        }
    }

    function handleUploadVideo(e) {
        e.preventDefault();
        console.log("Updating");
        setLoading(true);
        const formData = new FormData();
        const accessToken = localStorage.getItem("accessToken");

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("video", video);
        formData.append("thumbnail", thumbnail);
        axios.post("https://mytube-jjn3.onrender.com/video", formData, {
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
        })
        .then((res) => {
            if(res.data[0].message=="Video uploaded successfully"){
                alert("Video uploaded successfully")
            }
            console.log("Response:", res);
            setLoading(false);
        })
        .catch((err) => {
            console.log("Error:", err);
            setLoading(false);
        });
    }

    return (
        <div className="UploadVideo_Page">
            <h2>Upload Video</h2>
            <form onSubmit={handleUploadVideo} className="UploadVideo_form">
                <input
                    type="text"
                    placeholder="Title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <select
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                >
                    <option value="">Select a category</option> {/* Default option */}
                    <option value="Study">Study</option>
                    <option value="Games">Games</option>
                    <option value="Technology">Technology</option>
                    <option value="IT">IT</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="MERN Full Stack Developer">MERN Full Stack Developer</option>
                    <option value="Education">Education</option>
                    <option value="Others">Others</option>
                </select>

                <textarea
                    placeholder="Tags"
                    required
                    onChange={(e) => setTags(e.target.value)}
                ></textarea>

                <label>Select Video</label>
                <input type="file" required onChange={handleVideo} />
                <label>Select Thumbnail</label>
                <input type="file" required onChange={handleThumbnail} />

                {image && <img src={image} alt="Thumbnail" className="ThumbnailPreview" />}
                
                <button type="submit">{loading ? "Uploading..." : "Upload"}</button>
            </form>
        </div>
    );
}

export default UploadVideo;
