import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Heart, Loader2 } from 'lucide-react';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, note?: string) => Promise<void>;
  giftName: string;
  isSubmitting: boolean;
}

export const ClaimModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  giftName, 
  isSubmitting 
}: ClaimModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    note: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', note: '' });
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSubmit(formData.name.trim(), formData.email.trim(), formData.note.trim() || undefined);
    } catch (error) {
      console.error('Error submitting claim:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl bg-gradient-card border-0 shadow-hover">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-gradient-celebration rounded-full flex items-center justify-center mb-2">
            <Heart className="w-6 h-6 text-white animate-gentle-bounce" />
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            Claim Your Gift
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            You're claiming: <span className="font-medium text-foreground">{giftName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`rounded-xl border-celebration-light focus:border-celebration focus:ring-celebration/20 ${
                errors.name ? 'border-destructive' : ''
              }`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`rounded-xl border-celebration-light focus:border-celebration focus:ring-celebration/20 ${
                errors.email ? 'border-destructive' : ''
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm font-medium text-foreground">
              Optional Note
            </Label>
            <Textarea
              id="note"
              placeholder="Any special message or note (optional)"
              value={formData.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
              className="rounded-xl border-celebration-light focus:border-celebration focus:ring-celebration/20 min-h-[80px] resize-none"
              disabled={isSubmitting}
            />
          </div>

          <div className="bg-lavender-light p-3 rounded-xl">
            <p className="text-xs text-muted-foreground text-center">
              Your email will only be used to confirm your gift claim. 
              We won't send any promotional emails.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl border-celebration-light hover:bg-celebration-light"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-celebration hover:shadow-soft transition-all duration-300 rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Claiming...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Claim Gift
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};