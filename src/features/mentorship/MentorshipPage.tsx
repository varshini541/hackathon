import React, { useState } from 'react';
import { 
  Users, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Filter, 
  MessageSquare, 
  Clock,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const MentorshipPage: React.FC = () => {
  const { mentors, bookMentorSlot } = useApp();
  const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredMentors = mentors.filter(m =>
    m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.role.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.expertise.some(e => e.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const handleOpenBooking = (mentor: typeof mentors[0]) => {
    setSelectedMentor(mentor);
    setSelectedSlot(mentor.availableSlots[0] || '');
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedMentor || !selectedSlot) return;
    bookMentorSlot(selectedMentor.id, selectedSlot);
    setIsBookingModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Mentorship & Peer Advisory Network
            </h2>
            <Badge variant="neutral" className="text-[10px]">Dev 4 Module</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Connect 1-on-1 with verified industry leaders in AI, accessibility engineering, and product design.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by skill or mentor..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Mentor Cards Directory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} hoverEffect className="space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {mentor.name}
                    </h3>
                    {mentor.isVerified && <CheckCircle2 className="w-4 h-4 text-brand-600 fill-brand-600 shrink-0" />}
                  </div>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    {mentor.role}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {mentor.company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{mentor.rating}</span>
                <span className="text-slate-400 font-normal">({mentor.reviewsCount} mentee reviews)</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                {mentor.bio}
              </p>

              {/* Expertise Tags */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expertise:</p>
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[11px] font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="w-full mt-4"
              onClick={() => handleOpenBooking(mentor)}
              icon={<Calendar className="w-4 h-4" />}
            >
              Book 1-on-1 Session
            </Button>
          </Card>
        ))}
      </div>

      {/* Peer Q&A Community Highlights */}
      <Card className="bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 space-y-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="w-5 h-5 text-brand-600" />
            Peer Student Community Discussions
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-bold text-slate-900 dark:text-white">💬 "How to handle Dyslexia during timed coding interviews?"</p>
            <p className="text-slate-500 mt-1">Answered by Marcus Chen • 14 replies</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-bold text-slate-900 dark:text-white">💬 "Best PyTorch starter projects for second year undergrads?"</p>
            <p className="text-slate-500 mt-1">Answered by Dr. Elena Rostova • 8 replies</p>
          </div>
        </div>
      </Card>

      {/* Booking Modal */}
      {selectedMentor && (
        <Modal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          title={`Schedule Session with ${selectedMentor.name}`}
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsBookingModalOpen(false)}>Cancel</Button>
              <Button variant="accent" onClick={handleConfirmBooking}>Confirm & Book</Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <img src={selectedMentor.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{selectedMentor.name}</p>
                <p className="text-xs text-brand-600 font-medium">{selectedMentor.role} @ {selectedMentor.company}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Select Available Time Slot:
              </label>
              <div className="space-y-2">
                {selectedMentor.availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between cursor-pointer ${
                      selectedSlot === slot
                        ? 'border-brand-600 bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{slot}</span>
                    {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
