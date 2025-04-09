import { useState } from 'react';

const BilingualProductView = ({ product }) => {
  const [showBoth, setShowBoth] = useState(true);
  const [activeTab, setActiveTab] = useState('en');
  
  if (!product) {
    return (
      <div className="p-4 bg-gray-100 rounded text-gray-500 text-center">
        No product data available
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">{product.title?.en || 'Product Preview'}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowBoth(true)}
            className={`px-3 py-1 rounded text-sm ${
              showBoth 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Side by Side
          </button>
          <button
            onClick={() => {
              setShowBoth(false);
              setActiveTab('en');
            }}
            className={`px-3 py-1 rounded text-sm ${
              !showBoth && activeTab === 'en'
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            English
          </button>
          <button
            onClick={() => {
              setShowBoth(false);
              setActiveTab('zh');
            }}
            className={`px-3 py-1 rounded text-sm ${
              !showBoth && activeTab === 'zh'
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            中文
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {showBoth ? (
          <div className="grid grid-cols-2 gap-4">
            {/* English Column */}
            <div className="border rounded p-4">
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Title (EN)</h3>
                <p className="text-lg">{product.title?.en || 'No English title'}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Description (EN)</h3>
                <p>{product.description?.en || 'No English description'}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Features (EN)</h3>
                {product.features?.en && product.features.en.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {product.features.en.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No English features</p>
                )}
              </div>
              
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Specifications (EN)</h3>
                <div className="text-sm grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}:</span> {value || 'N/A'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Chinese Column */}
            <div className="border rounded p-4">
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">标题 (ZH)</h3>
                <p className="text-lg">{product.title?.zh || '没有中文标题'}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">描述 (ZH)</h3>
                <p>{product.description?.zh || '没有中文描述'}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">特点 (ZH)</h3>
                {product.features?.zh && product.features.zh.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {product.features.zh.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">没有中文特点</p>
                )}
              </div>
              
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">规格 (ZH)</h3>
                <div className="text-sm grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}:</span> {value || '无'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded p-4">
            {activeTab === 'en' ? (
              // English Content
              <>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Title</h3>
                  <p className="text-xl">{product.title?.en || 'No English title'}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Description</h3>
                  <p>{product.description?.en || 'No English description'}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Features</h3>
                  {product.features?.en && product.features.en.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {product.features.en.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No English features</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications || {}).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium">{key}:</span> {value || 'N/A'}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              // Chinese Content
              <>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">标题</h3>
                  <p className="text-xl">{product.title?.zh || '没有中文标题'}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">描述</h3>
                  <p>{product.description?.zh || '没有中文描述'}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">特点</h3>
                  {product.features?.zh && product.features.zh.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {product.features.zh.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">没有中文特点</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">规格</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications || {}).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium">{key}:</span> {value || '无'}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Product image */}
      {product.image && (
        <div className="border-t p-4">
          <img 
            src={product.image} 
            alt={product.title?.en || 'Product image'} 
            className="max-h-64 mx-auto object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default BilingualProductView;