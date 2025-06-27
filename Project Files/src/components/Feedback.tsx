import React, { useState } from 'react';
import { Star, Send, MessageSquare, ThumbsUp } from 'lucide-react';

interface FeedbackItem {
  id: string;
  rating: number;
  comment: string;
  date: string;
  orderNumber?: string;
}

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock feedback history
  const feedbackHistory: FeedbackItem[] = [
    {
      id: '1',
      rating: 5,
      comment: 'Excellent service! The groceries were fresh and delivered on time.',
      date: '2024-01-15',
      orderNumber: 'ORD-2024-001'
    },
    {
      id: '2',
      rating: 4,
      comment: 'Good quality products, but the delivery was slightly delayed.',
      date: '2024-01-10',
      orderNumber: 'ORD-2024-002'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Experience' },
    { value: 'delivery', label: 'Delivery Service' },
    { value: 'product-quality', label: 'Product Quality' },
    { value: 'website', label: 'Website/App' },
    { value: 'customer-service', label: 'Customer Service' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert('Thank you for your feedback! We appreciate your input.');
    setRating(0);
    setComment('');
    setCategory('general');
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback & Reviews</h1>
        <p className="text-gray-600">Help us improve by sharing your experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Feedback Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <MessageSquare className="h-6 w-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Share Your Feedback</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Rating
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {rating === 0 && 'Please select a rating'}
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Comments
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Tell us about your experience..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Feedback History */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <ThumbsUp className="h-6 w-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Your Previous Feedback</h2>
          </div>

          {feedbackHistory.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No feedback submitted yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {feedbackHistory.map((feedback) => (
                <div key={feedback.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= feedback.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(feedback.date)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-2">{feedback.comment}</p>
                  
                  {feedback.orderNumber && (
                    <div className="text-sm text-gray-500">
                      Order: {feedback.orderNumber}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Thank You Message */}
      <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-emerald-800 mb-2">
          We Value Your Opinion
        </h3>
        <p className="text-emerald-700">
          Your feedback helps us continuously improve our service and provide you with the best grocery shopping experience.
        </p>
      </div>
    </div>
  );
};

export default Feedback;