import { useState } from "react";
import Form from "./components/Form";
import PostsList from "./components/PostsList";

import "./App.css";

function App() {
  const categories = ["Category 1", "Category 2", "Category 3"];
  const tags = ["Tag 1", "Tag 2", "Tag 3"];

  const initialFormData = {
    id: "",
    title: "",
    image: "",
    content: "",
    category: "",
    tags: [],
    published: false,
  };

  const [postsList, setPostList] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36);
  }

  function handleFormSubmit() {
    const newPost = {
      id: generateUniqueId(),
      title: formData.title,
      image: formData.image,
      content: formData.content,
      category: formData.category,
      tags: [...formData.tags],
      published: formData.published,
    };

    const newPostList = [...postsList, newPost];
    setPostList(newPostList);
    setFormData(initialFormData);
  }

  function handleDelete(idToDelete) {
    const updatedPosts = postsList.filter((post) => post.id !== idToDelete);
    setPostList(updatedPosts);
  }

  function handleEdit(idToEdit) {
    let postToEdit = postsList.find((post) => post.id === idToEdit);
    console.log(postToEdit);
    if (postToEdit) {
      setFormData(postToEdit);
      handleDelete(idToEdit);
    }
  }

  function updateFormData(field, newValue) {
    let newFormData = { ...formData };

    newFormData[field] = newValue;

    setFormData(newFormData);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">My form!</h1>
      <Form
        propFormData={formData}
        onValueChange={(field, newValue) => updateFormData(field, newValue)}
        onSubmit={handleFormSubmit}
        categories={categories}
        tags={tags}
      />
      <PostsList
        posts={postsList}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}

export default App;
