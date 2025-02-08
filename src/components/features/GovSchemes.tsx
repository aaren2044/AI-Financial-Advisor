import React, { useState, useEffect } from 'react';
import { Building, CheckCircle, Info } from 'lucide-react';
import { features } from '../../services/api';

const GovSchemes = () => {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await features.govSchemes.getEligibleSchemes();
      setSchemes(response.data);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyForScheme = async (schemeId: string) => {
    try {
      await features.govSchemes.applyForScheme(schemeId, {
        // Add application details
      });
      // Update UI to show application submitted
    } catch (error) {
      console.error('Error applying for scheme:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-4">
        Government Schemes
      </h3>

      {loading ? (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {scheme.name}
                  </h4>
                  <p className="text-gray-400 mt-1">
                    {scheme.description}
                  </p>
                  
                  <div className="mt-3 flex items-center space-x-4">
                    <span className="text-sm text-gray-400">
                      <Building size={16} className="inline mr-1" />
                      {scheme.department}
                    </span>
                    <span className="text-sm text-gray-400">
                      <Info size={16} className="inline mr-1" />
                      Benefits up to ₹{scheme.maxBenefit}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => applyForScheme(scheme.id)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                >
                  Apply Now
                </button>
              </div>

              {scheme.requirements && (
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <h5 className="text-white font-medium mb-2">Requirements</h5>
                  <ul className="space-y-1">
                    {scheme.requirements.map((req: string, index: number) => (
                      <li key={index} className="text-gray-400 flex items-center">
                        <CheckCircle size={16} className="text-green-400 mr-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GovSchemes;