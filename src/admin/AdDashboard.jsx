import { useState, useEffect } from 'react';
import { getAds, createAd, updateAd, deleteAd, getAdsByPosition } from '../api/adService';
import { getCategories } from '../api/categoryService';
import { getSettings, setSetting, getGifUrl, setGifUrl } from '../api/settingsService';
import { supabase } from '../api/supabaseClient';
import AdForm from './AdForm';

const AdDashboard = () => {
  const [activeTab, setActiveTab] = useState('slider');
  const [topBanners, setTopBanners] = useState([]);
  const [headerGridAds, setHeaderGridAds] = useState([]);
  const [gifUrl, setGifUrlState] = useState('');
  const [mediumAds, setMediumAds] = useState([]);
  const [bottomBanner, setBottomBanner] = useState(null);
  const [sidebarAds, setSidebarAds] = useState([]);
  const [categoryAds, setCategoryAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formPosition, setFormPosition] = useState('');

  // Load all data
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Top banners
        const tops = await getAdsByPosition('top_banner');
        setTopBanners(tops);

        // Header bottom grid (3 specific positions)
        const hb1 = await getAdsByPosition('header_bottom_1');
        const hb2 = await getAdsByPosition('header_bottom_2');
        const hb3 = await getAdsByPosition('header_bottom_3');
        setHeaderGridAds([hb1[0] || null, hb2[0] || null, hb3[0] || null]);

        // GIF
        const gif = await getGifUrl();
        setGifUrlState(gif || '');

        // Medium ads (positions medium_1 to medium_7)
        const mediums = [];
        for (let i = 1; i <= 7; i++) {
          const ad = await getAdsByPosition(`medium_${i}`);
          mediums.push(ad[0] || null);
        }
        setMediumAds(mediums);

        // Bottom banner
        const bottom = await getAdsByPosition('bottom_banner');
        setBottomBanner(bottom[0] || null);

        // Sidebar ads
        const sbTop = await getAdsByPosition('sidebar_top');
        const sbMid = await getAdsByPosition('sidebar_middle');
        const sbBottom = await getAdsByPosition('sidebar_bottom');
        setSidebarAds([sbTop[0] || null, sbMid[0] || null, sbBottom[0] || null]);

        // Categories for category banners
        const cats = await getCategories();
        setCategories(cats);

        // Category ads mapping
        const { data: catAds } = await supabase.from('category_ads').select('category_id, ad_id');
        setCategoryAds(catAds || []);
      } catch (err) {
        console.error('Failed to load ad data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleAdd = (position) => {
    setEditingAd(null);
    setFormPosition(position);
    setShowForm(true);
  };

  const handleEdit = (ad, position) => {
    setEditingAd(ad);
    setFormPosition(position);
    setShowForm(true);
  };

  const handleDelete = async (id, position) => {
    if (!window.confirm('Delete this ad?')) return;
    try {
      await deleteAd(id);
      // Refresh data for this position (simplified: reload all)
      window.location.reload();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingAd) {
        await updateAd(editingAd.id, formData);
      } else {
        await createAd(formData);
      }
      setShowForm(false);
      window.location.reload(); // Simple reload to refresh all data
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const handleGifSave = async () => {
    try {
      await setGifUrl(gifUrl);
      alert('GIF saved');
    } catch (err) {
      console.error('GIF save failed:', err);
    }
  };

  const handleCategoryAdChange = async (categoryId, adId) => {
    // Upsert into category_ads
    const { error } = await supabase
      .from('category_ads')
      .upsert({ category_id: categoryId, ad_id: adId || null }, { onConflict: 'category_id' });
    if (error) console.error('Failed to update category ad:', error);
    else window.location.reload();
  };

  if (loading) return <div>Loading advertisement dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Advertisement Management</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setActiveTab('slider')} className={`pb-2 px-1 ${activeTab === 'slider' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Top Slider</button>
          <button onClick={() => setActiveTab('headerGrid')} className={`pb-2 px-1 ${activeTab === 'headerGrid' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Header Bottom Grid</button>
          <button onClick={() => setActiveTab('gif')} className={`pb-2 px-1 ${activeTab === 'gif' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>News Loop GIF</button>
          <button onClick={() => setActiveTab('medium')} className={`pb-2 px-1 ${activeTab === 'medium' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Medium Ads</button>
          <button onClick={() => setActiveTab('bottom')} className={`pb-2 px-1 ${activeTab === 'bottom' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Bottom Banner</button>
          <button onClick={() => setActiveTab('sidebar')} className={`pb-2 px-1 ${activeTab === 'sidebar' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Sidebar Ads</button>
          <button onClick={() => setActiveTab('category')} className={`pb-2 px-1 ${activeTab === 'category' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}>Category Banners</button>
        </nav>
      </div>

      {activeTab === 'slider' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Top Slider (max 5 ads)</h2>
            {topBanners.length < 5 && (
              <button onClick={() => handleAdd('top_banner')} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Ad</button>
            )}
          </div>
          <div className="grid gap-4">
            {topBanners.map((ad, idx) => (
              <div key={ad.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <p><strong>{ad.name}</strong> – {ad.type === 'image' ? 'Image' : 'Code'}</p>
                  {ad.type === 'image' && ad.image_url && <img src={ad.image_url} className="h-12 mt-1" alt={ad.name} />}
                </div>
                <div>
                  <button onClick={() => handleEdit(ad, 'top_banner')} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => handleDelete(ad.id)} className="text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'headerGrid' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Header Bottom Grid (3 positions)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0,1,2].map(idx => (
              <div key={idx} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">Position {idx+1}</h3>
                {headerGridAds[idx] ? (
                  <div className="mt-2">
                    <p>{headerGridAds[idx].name}</p>
                    {headerGridAds[idx].type === 'image' && headerGridAds[idx].image_url && (
                      <img src={headerGridAds[idx].image_url} className="h-16 mt-1" />
                    )}
                    <div className="mt-2">
                      <button onClick={() => handleEdit(headerGridAds[idx], `header_bottom_${idx+1}`)} className="text-blue-600 mr-3">Edit</button>
                      <button onClick={() => handleDelete(headerGridAds[idx].id)} className="text-red-600">Delete</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => handleAdd(`header_bottom_${idx+1}`)} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm">Add Ad</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'gif' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">News Loop GIF</h2>
          <div className="bg-white p-4 rounded shadow">
            <label className="block text-sm font-medium mb-1">GIF URL</label>
            <input
              type="url"
              value={gifUrl}
              onChange={(e) => setGifUrlState(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <button onClick={handleGifSave} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Save GIF</button>
            {gifUrl && <img src={gifUrl} className="mt-4 max-h-40" alt="GIF preview" />}
          </div>
        </div>
      )}

      {activeTab === 'medium' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Medium Ads (7 slots)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediumAds.map((ad, idx) => {
              const position = `medium_${idx+1}`;
              return (
                <div key={position} className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold">Slot {idx+1}</h3>
                  {ad ? (
                    <div>
                      <p>{ad.name}</p>
                      {ad.type === 'image' && ad.image_url && <img src={ad.image_url} className="h-16 mt-1" />}
                      <div className="mt-2">
                        <button onClick={() => handleEdit(ad, position)} className="text-blue-600 mr-3">Edit</button>
                        <button onClick={() => handleDelete(ad.id)} className="text-red-600">Delete</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => handleAdd(position)} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm">Add Ad</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'bottom' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Bottom Banner</h2>
          <div className="bg-white p-4 rounded shadow">
            {bottomBanner ? (
              <div>
                <p>{bottomBanner.name}</p>
                {bottomBanner.type === 'image' && bottomBanner.image_url && <img src={bottomBanner.image_url} className="h-16 mt-1" />}
                <div className="mt-2">
                  <button onClick={() => handleEdit(bottomBanner, 'bottom_banner')} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => handleDelete(bottomBanner.id)} className="text-red-600">Delete</button>
                </div>
              </div>
            ) : (
              <button onClick={() => handleAdd('bottom_banner')} className="bg-blue-600 text-white px-4 py-2 rounded">Add Ad</button>
            )}
          </div>
        </div>
      )}

      {activeTab === 'sidebar' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Sidebar Ads</h2>
          <div className="space-y-4">
            {['sidebar_top', 'sidebar_middle', 'sidebar_bottom'].map((pos, idx) => {
              const ad = sidebarAds[idx];
              return (
                <div key={pos} className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold">{pos.replace('_', ' ').toUpperCase()}</h3>
                  {ad ? (
                    <div>
                      <p>{ad.name}</p>
                      {ad.type === 'image' && ad.image_url && <img src={ad.image_url} className="h-16 mt-1" />}
                      <div className="mt-2">
                        <button onClick={() => handleEdit(ad, pos)} className="text-blue-600 mr-3">Edit</button>
                        <button onClick={() => handleDelete(ad.id)} className="text-red-600">Delete</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => handleAdd(pos)} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm">Add Ad</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'category' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Category Banners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map(cat => {
              const catAd = categoryAds.find(ca => ca.category_id === cat.id);
              const adId = catAd?.ad_id || '';
              return (
                <div key={cat.id} className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold">{cat.name}</h3>
                  <select
                    value={adId}
                    onChange={async (e) => {
                      const newAdId = e.target.value;
                      await handleCategoryAdChange(cat.id, newAdId);
                    }}
                    className="w-full border rounded px-2 py-1 mt-2"
                  >
                    <option value="">None</option>
                    {/* Optionally fetch all ads for dropdown */}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">This ad will appear under the category title.</p>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-500 mt-4">To create a new ad for a category, go to the appropriate tab and create an ad with position like <strong>category_{slug}_banner</strong>.</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-md w-full">
            <AdForm
              ad={editingAd}
              onSubmit={async (data) => {
                data.position = formPosition;
                await handleFormSubmit(data);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdDashboard;