// src/components/admin/ContentfulProductForm.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ContentfulProductForm = ({ product, onSave, isNew = false }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: { en: '', zh: '' },
    description: { en: '', zh: '' },
    features: { en: [], zh: [] },
    specifications: {
      dimensions: '',
      weight: '',
      resolution: '',
      technology: '',
      interface: '',
      size: '',
      backlight: '',
      brightness: '',
      aspectRatio: '',
      videoInputs: '',
      compatibleOS: '',
      contrastRatio: '',
      otherInterfaces: ''
    },
    warranty: '',
    safetyWarning: '',
    notes: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  // Initialize form with product data if available
  useEffect(() => {
    if (product) {
      setFormData({
        ...formData,
        ...product,
        // Ensure all multilingual fields have both languages
        title: {
          en: product.title?.en || '',
          zh: product.title?.zh || ''
        },
        description: {
          en: product.description?.en || '',
          zh: product.description?.zh || ''
        },
        features: {
          en: product.features?.en || [],
          zh: product.features?.zh || []
        },
        specifications: {
          ...formData.specifications,
          ...product.specifications
        }
      });
    }
  }, [product]);

  const handleChange = (field, value, language = null) => {
    setIsDirty(true);
    
    if (language) {
      // Handle multilingual fields
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [language]: value
        }
      }));
    } else if (field.startsWith('specifications.')) {
      // Handle nested specification fields
      const specField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specField]: value
        }
      }));
    } else {
      // Handle regular fields
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleFeatureChange = (index, value, language) => {
    setIsDirty(true);
    
    const newFeatures = [...formData.features[language]];
    newFeatures[index] = value;
    
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [language]: newFeatures
      }
    }));
  };

  const addFeature = (language) => {
    setIsDirty(true);
    
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [language]: [...prev.features[language], '']
      }
    }));
  };

  const removeFeature = (index, language) => {
    setIsDirty(true);
    
    const newFeatures = [...formData.features[language]];
    newFeatures.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [language]: newFeatures
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await onSave(formData);
      setIsDirty(false);
      if (isNew) {
        router.push('/admin/products');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {/* Title Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            English Title
          </label>
          <input
            type="text"
            value={formData.title.en}
            onChange={(e) => handleChange('title', e.target.value, 'en')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chinese Title (中文标题)
          </label>
          <input
            type="text"
            value={formData.title.zh}
            onChange={(e) => handleChange('title', e.target.value, 'zh')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>
      
      {/* Description Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            English Description
          </label>
          <textarea
            value={formData.description.en}
            onChange={(e) => handleChange('description', e.target.value, 'en')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chinese Description (中文描述)
          </label>
          <textarea
            value={formData.description.zh}
            onChange={(e) => handleChange('description', e.target.value, 'zh')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              English Features
            </label>
            <button
              type="button"
              onClick={() => addFeature('en')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Feature
            </button>
          </div>
          {formData.features.en.map((feature, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value, 'en')}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
                placeholder={`Feature ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeFeature(index, 'en')}
                className="bg-red-100 text-red-600 px-3 py-2 rounded-r-md"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Chinese Features (中文特点)
            </label>
            <button
              type="button"
              onClick={() => addFeature('zh')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + 添加特点
            </button>
          </div>
          {formData.features.zh.map((feature, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value, 'zh')}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
                placeholder={`特点 ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeFeature(index, 'zh')}
                className="bg-red-100 text-red-600 px-3 py-2 rounded-r-md"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Specifications */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Technical Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dimensions
            </label>
            <input
              type="text"
              value={formData.specifications.dimensions}
              onChange={(e) => handleChange('specifications.dimensions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., 262.7mm × 174.7mm × 39.2mm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight
            </label>
            <input
              type="text"
              value={formData.specifications.weight}
              onChange={(e) => handleChange('specifications.weight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., 1.3kg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resolution
            </label>
            <input
              type="text"
              value={formData.specifications.resolution}
              onChange={(e) => handleChange('specifications.resolution', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., 1280x800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technology
            </label>
            <input
              type="text"
              value={formData.specifications.technology}
              onChange={(e) => handleChange('specifications.technology', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Capacitive"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interface
            </label>
            <input
              type="text"
              value={formData.specifications.interface}
              onChange={(e) => handleChange('specifications.interface', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., USB/I2C"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <input
              type="text"
              value={formData.specifications.size}
              onChange={(e) => handleChange('specifications.size', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., 10.1 inch"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Backlight
            </label>
            <input
              type="text"
              value={formData.specifications.backlight}
              onChange={(e) => handleChange('specifications.backlight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., LED"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brightness
            </label>
            <input
              type="text"
              value={formData.specifications.brightness}
              onChange={(e) => handleChange('specifications.brightness', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., 200 cd/m²"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aspect Ratio
            </label>
            <input
              type="text"
              value={formData.specifications.aspectRatio}
              onChange={(e) => handleChange('specifications.aspectRatio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., 16:10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video Inputs
            </label>
            <input
              type="text"
              value={formData.specifications.videoInputs}
              onChange={(e) => handleChange('specifications.videoInputs', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., VGA+DVI-D"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compatible OS
            </label>
            <input
              type="text"
              value={formData.specifications.compatibleOS}
              onChange={(e) => handleChange('specifications.compatibleOS', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Windows, Linux, Android"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contrast Ratio
            </label>
            <input
              type="text"
              value={formData.specifications.contrastRatio}
              onChange={(e) => handleChange('specifications.contrastRatio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., 1000:1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other Interfaces
            </label>
            <input
              type="text"
              value={formData.specifications.otherInterfaces}
              onChange={(e) => handleChange('specifications.otherInterfaces', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., USB 2.0/DC 12V"
            />
          </div>
        </div>
      </div>
      
      {/* Additional Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Warranty Information
          </label>
          <textarea
            value={formData.warranty}
            onChange={(e) => handleChange('warranty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Safety Warnings
          </label>
          <textarea
            value={formData.safetyWarning}
            onChange={(e) => handleChange('safetyWarning', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes for Attention
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>
      </div>
      
      {/* Form actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !isDirty}
          className={`px-4 py-2 rounded-md text-white ${
            isLoading || !isDirty
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Saving...' : isNew ? 'Create Product' : 'Update Product'}
        </button>
      </div>
    </form>
  );
};

export default ContentfulProductForm;