import axios from "axios";
import {  useState } from "react"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditVideo() {
    
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const navigate=useNavigate();
    const params=useParams();

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

    function handleUpdateVideo(e) {
        e.preventDefault();
        console.log("Updating");
        setLoading(true);
        const formData = new FormData();
        const accessToken = localStorage.getItem("accessToken");

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("thumbnail", thumbnail);
        axios.put(`https://mytube-jjn3.onrender.com/${params.id}`, formData, {
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
        })
        .then((res) => {
            if(res.data[0].message=="video updated"){
                alert("Video updated successfully")
                navigate("/profile/mychannel")
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
            <h2>update Video</h2>
            <form onSubmit={handleUpdateVideo} className="UploadVideo_form">
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
                    <option value="Entertainment">Entertainment</option>
                    <option value="Developers">Developers</option>
                    <option value="Songs">Songs</option>
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
                <label>Select Thumbnail</label>
                <input type="file" required onChange={handleThumbnail} />

                {image && <img src={image} alt="Thumbnail" className="ThumbnailPreview" />}
                
                <button type="submit">{loading ? "Updating..." : "Update"}</button>
            </form></div>
    );
}

export default EditVideo;
