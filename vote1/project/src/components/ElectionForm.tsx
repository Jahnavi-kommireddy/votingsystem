import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useVote } from "../context/VoteContext";

type Candidate = {
  name: string;
  position: string;
  bio: string;
};

type ElectionFormProps = {
  onSubmit: (election: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    candidates: Candidate[];
  }) => void;
};

const ElectionForm: React.FC<ElectionFormProps> = ({ onSubmit }) => {
  const { addCandidate } = useVote();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    candidates: [{ name: '', position: '', bio: '' }]
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleCandidateChange = (index: number, field: keyof Candidate, value: string) => {
    setFormData(prev => ({
      ...prev,
      candidates: prev.candidates.map((candidate, i) =>
        i === index ? { ...candidate, [field]: value } : candidate
      )
    }));
    setError(null);
  };

  const addCandidateUI = () => {
    if (formData.candidates.length >= 10) {
      setError('Maximum 10 candidates allowed per election');
      return;
    }
    setFormData(prev => ({
      ...prev,
      candidates: [...prev.candidates, { name: '', position: '', bio: '' }]
    }));
  };

  const removeCandidate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      candidates: prev.candidates.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      setError('Please fill in all election details');
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const now = new Date();

    now.setSeconds(0);
    now.setMilliseconds(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    if (startDate < now) {
      setError('Start time must be in the future');
      return;
    }
    if (endDate <= startDate) {
      setError('End date must be after start date');
      return;
    }
    const minDuration = 60 * 1000;
    if (endDate.getTime() - startDate.getTime() < minDuration) {
      setError('Election must run for at least 1 minute');
      return;
    }
    const maxDuration = 30 * 24 * 60 * 60 * 1000;
    if (endDate.getTime() - startDate.getTime() > maxDuration) {
      setError('Election cannot run for more than 30 days');
      return;
    }
    if (formData.candidates.some(c => !c.name || !c.position)) {
      setError('Please fill in all candidate details');
      return;
    }
    const candidateNames = formData.candidates.map(c => c.name.toLowerCase());
    if (new Set(candidateNames).size !== candidateNames.length) {
      setError('Duplicate candidate names are not allowed');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Add each candidate to the blockchain (only name is stored on-chain)
      for (const candidate of formData.candidates) {
        await addCandidate(candidate.name);
      }
      alert("All candidates added to the blockchain!");
      onSubmit(formData); // You can use this to store off-chain details if needed
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        candidates: [{ name: '', position: '', bio: '' }]
      });
    } catch (err: any) {
      setError(err.message || "Blockchain transaction failed");
    } finally {
      setLoading(false);
    }
  };

  // Set minimum date-time for start date (current time rounded to next minute)
  const getMinStartDate = () => {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now.toISOString().slice(0, 16);
  };

  // Set minimum date-time for end date (start date + 1 minute)
  const getMinEndDate = () => {
    if (!formData.startDate) return '';
    const startDate = new Date(formData.startDate);
    startDate.setMinutes(startDate.getMinutes() + 1);
    return startDate.toISOString().slice(0, 16);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Election Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            placeholder="e.g., Student Council Election 2025"
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="form-input mt-1 block w-full"
            placeholder="Describe the purpose and scope of this election"
            maxLength={500}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={getMinStartDate()}
              className="form-input mt-1 block w-full"
            />
            <p className="mt-1 text-sm text-gray-500">
              Must be in the future
            </p>
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={getMinEndDate()}
              className="form-input mt-1 block w-full"
            />
            <p className="mt-1 text-sm text-gray-500">
              Must be at least 1 minute after start time
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Candidates</h3>
            <button
              type="button"
              onClick={addCandidateUI}
              className="flex items-center text-blue-600 hover:text-blue-700"
              disabled={loading}
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add Candidate
            </button>
          </div>

          <div className="space-y-4">
            {formData.candidates.map((candidate, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Candidate {index + 1}</h4>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeCandidate(index)}
                      className="text-red-600 hover:text-red-700"
                      disabled={loading}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={candidate.name}
                      onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
                      className="form-input mt-1 block w-full"
                      placeholder="Candidate's full name"
                      maxLength={50}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="text"
                      value={candidate.position}
                      onChange={(e) => handleCandidateChange(index, 'position', e.target.value)}
                      className="form-input mt-1 block w-full"
                      placeholder="e.g., President, Secretary"
                      maxLength={50}
                      disabled={loading}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      value={candidate.bio}
                      onChange={(e) => handleCandidateChange(index, 'bio', e.target.value)}
                      className="form-input mt-1 block w-full"
                      rows={2}
                      placeholder="Brief description of the candidate"
                      maxLength={200}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Election"}
        </button>
      </div>
    </form>
  );
};

export default ElectionForm;