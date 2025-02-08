import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import { NewsSearch } from '../components/NewsSearch';
import { NewsCard } from '../components/NewsCard';
import { AIAssistant } from '../components/AIAssistantN';
import type { NewsArticle } from '../typesn';

const SURF_API_KEY = 'fd3a0a10576a1632d898dfbc3b7ba5bc183a5e629333a634dbf4c1f5617b4d6c';
const GEMINI_API_KEY = 'AIzaSyBe2nbxp1NYpt5BTD0yiIkPfXCYvQ-GHHo';

// Pre-loaded news articles
const preloadedNews: NewsArticle[] = [
  {
    title: "महिला सक्षमीकरण योजना: महाराष्ट्र सरकारची नवी पहल",
    description: "महिलांच्या आर्थिक विकासासाठी महाराष्ट्र सरकारने नवीन योजना जाहीर केली आहे. या योजनेंतर्गत महिलांना व्यवसाय सुरू करण्यासाठी विशेष कर्ज सुविधा देण्यात येणार आहे.",
    url: "https://www.cnbctv18.com/india/maharashtra-removes-5-lakh-ineligible-women-from-ladki-bahin-scheme-19554754.htm",
    publishedAt: "2024-03-15T10:00:00Z",
    source: {
      name: "Maharashtra Government Portal"
    }
  },
  {
    title: "महिला बचत गटांसाठी विशेष प्रशिक्षण कार्यक्रम",
    description: "राज्य सरकारतर्फे महिला बचत गटांना व्यावसायिक प्रशिक्षण देण्यात येणार आहे. यामध्ये डिजिटल मार्केटिंग, वित्तीय व्यवस्थापन आणि उत्पादन तंत्रज्ञानाचा समावेश असेल.",
    url: "https://www.news18.com/india/maharashtras-ladki-bahin-scheme-5-lakh-beneficiaries-removed-after-scrutiny-9218789.html",
    publishedAt: "2024-03-14T15:30:00Z",
    source: {
      name: "Maharashtra Times"
    }
  },
  {
    title: "शिक्षण क्षेत्रात महिलांसाठी विशेष संधी",
    description: "उच्च शिक्षणासाठी महिलांना विशेष शिष्यवृत्ती योजना जाहीर. STEM क्षेत्रात करिअर करू इच्छिणाऱ्या मुलींसाठी प्रोत्साहनपर कार्यक्रम.",
    url: "https://www.thehansindia.com/news/national/maha-govt-excludes-5-lakh-ineligible-women-beneficiaries-from-ladki-bahin-scheme-943336",
    publishedAt: "2024-03-13T09:15:00Z",
    source: {
      name: "Education Department"
    }
  },
  {
    title: "ग्रामीण महिलांसाठी कौशल्य विकास कार्यक्रम",
    description: "ग्रामीण भागातील महिलांच्या सक्षमीकरणासाठी विशेष कौशल्य विकास कार्यक्रम. यामध्ये हस्तकला, शेती व्यवसाय आणि पारंपारिक कलांचे प्रशिक्षण.",
    url: "https://indianexpress.com/article/cities/mumbai/maharashtra-ladki-bahin-scheme-ineligible-beneficiaries-return-money-9823603/",
    publishedAt: "2024-03-12T14:45:00Z",
    source: {
      name: "Rural Development Department"
    }
  },
  {
    title: "महिला उद्योजकांसाठी विशेष आर्थिक मदत",
    description: "स्टार्टअप सुरू करणाऱ्या महिला उद्योजकांना 50 लाखांपर्यंत आर्थिक मदत. या योजनेत विशेष व्याज दरात कर्ज आणि सरकारी अनुदानाचा समावेश.",
    url: "https://www.deccanchronicle.com/nation/current-affairs/maharashtra-governments-assures-continuation-of-ladki-bahin-scheme-1859812",
    publishedAt: "2024-03-11T11:20:00Z",
    source: {
      name: "Industries Department"
    }
  }
];

function News() {
  const [articles, setArticles] = useState<NewsArticle[]>(preloadedNews);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load additional news about Maharashtra government schemes for women
    handleSearch('Maharashtra government schemes women empowerment', 'mr');
  }, []);

  const handleSearch = async (query: string, language: string) => {
    try {
      const response = await fetch(
        `https://api.surfshark.com/v1/news/search?q=${encodeURIComponent(
          query
        )}&language=${language}&apiKey=${SURF_API_KEY}`
      );
      const data = await response.json();
      setArticles(data.articles || preloadedNews);
    } catch (error) {
      console.error('Error fetching news:', error);
      setArticles(preloadedNews);
    }
  };

  const handleAIQuestion = async (question: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GEMINI_API_KEY}`,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: question }],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      setAiResponse(data.candidates[0]?.content?.parts[0]?.text || 'No response from AI');
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiResponse('Error getting AI response');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">MultiLingual News Search</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Search for news articles in multiple languages with AI assistance
          </p>
          <p className="text-purple-400 mt-2">
            Currently showing: Maharashtra Government Schemes for Women
          </p>
        </header>

        {/* <div className="mb-12">
          <NewsSearch onSearch={handleSearch} />
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {articles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AIAssistant
              onAsk={handleAIQuestion}
              response={aiResponse}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;