import { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    theme_color: '#000000',
    section_type: '',
    is_in_nav: true,           // new field
    nav_order: 0,              // new field
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        theme_color: category.theme_color || '#000000',
        section_type: category.section_type || '',
        is_in_nav: category.is_in_nav ?? true,
        nav_order: category.nav_order ?? 0,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{category ? 'Edit Category' : 'Add New Category'}</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name (Sinhala)</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL-friendly)</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <p className="text-xs text-gray-500 mt-1">e.g., "politics" (lowercase, hyphens)</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
        <input
          type="color"
          name="theme_color"
          value={formData.theme_color}
          onChange={handleChange}
          className="h-10 w-20 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Section Type (optional)</label>
        <select
          name="section_type"
          value={formData.section_type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select type</option>
          <option value="main_feed">Main Feed</option>
          <option value="sidebar">Sidebar</option>
        </select>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="is_in_nav"
            checked={formData.is_in_nav}
            onChange={handleChange}
            className="mr-2"
          />
          Show in Navigation Bar
        </label>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Navigation Order</label>
          <input
            type="number"
            name="nav_order"
            value={formData.nav_order}
            onChange={handleChange}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md"
          />
          <p className="text-xs text-gray-500">Lower numbers appear first</p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {category ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;