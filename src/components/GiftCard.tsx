import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ExternalLink, ShoppingBag, User } from 'lucide-react';
import { ClaimModal } from './ClaimModal';

export interface GiftItem {
  id: number;
  name: string;
  image_url: string;
  category: string;
  note: string;
  currency: 'NGN' | 'USD';
  price?: number;
  stores: Array<{
    label: string;
    url: string;
    region: string;
  }>;
}

export interface ClaimData {
  item_id: number;
  claimer_name: string;
  claimer_email: string;
  created_at?: string;
}

interface GiftCardProps {
  item: GiftItem;
  claim?: ClaimData;
  currency: 'NGN' | 'USD';
  onClaim: (itemId: number, claimerName: string, claimerEmail: string, note?: string) => Promise<void>;
}

export const GiftCard = ({ item, claim, currency, onClaim }: GiftCardProps) => {
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: number, curr: string) => {
    if (curr === 'NGN') {
      return `₦${price.toLocaleString()}`;
    }
    return `$${price}`;
  };

  const displayPrice = item.currency === currency ? item.price : null;
  const isClaimed = !!claim;
  const claimerFirstName = claim?.claimer_name?.split(' ')[0];

  const handleClaim = async (claimerName: string, claimerEmail: string, note?: string) => {
    setIsSubmitting(true);
    try {
      await onClaim(item.id, claimerName, claimerEmail, note);
      setShowClaimModal(false);
    } catch (error) {
      console.error('Error claiming gift:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card 
        className={`
          h-full overflow-hidden transition-all duration-300 ease-out
          ${isClaimed 
            ? 'bg-muted/50 border-muted' 
            : 'bg-gradient-card hover:shadow-hover hover:-translate-y-1 cursor-pointer'
          }
          border-0 shadow-card rounded-2xl
        `}
      >
        <div className="relative aspect-square overflow-hidden rounded-t-2xl">
          <img
            src={item.image_url}
            alt={item.name}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isClaimed ? 'grayscale opacity-60' : 'hover:scale-105'
            }`}
          />
          {isClaimed && (
            <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
              <div className="bg-sage text-white px-4 py-2 rounded-full shadow-soft flex items-center gap-2 transform rotate-12">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Claimed!</span>
              </div>
            </div>
          )}
          <Badge 
            variant="secondary"
            className="absolute top-3 right-3 bg-white/90 text-foreground shadow-soft"
          >
            {item.category}
          </Badge>
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight text-foreground">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {item.note}
            </p>
          </div>

          {displayPrice && (
            <div className="text-lg font-bold text-celebration">
              {formatPrice(displayPrice, currency)}
            </div>
          )}

          {isClaimed && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-sage-light px-3 py-2 rounded-lg">
              <User className="w-4 h-4" />
              <span>Claimed by {claimerFirstName}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2 w-full">
            {item.stores.map((store, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="flex-1 min-w-0 text-xs border-celebration-light hover:bg-celebration-light"
                onClick={() => window.open(store.url, '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{store.label}</span>
              </Button>
            ))}
          </div>

          <Button
            className={`w-full ${
              isClaimed 
                ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                : 'bg-gradient-celebration hover:shadow-soft transition-all duration-300'
            }`}
            onClick={() => !isClaimed && setShowClaimModal(true)}
            disabled={isClaimed}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {isClaimed ? 'Already Claimed' : 'Claim This Gift'}
          </Button>
        </CardFooter>
      </Card>

      <ClaimModal
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        onSubmit={handleClaim}
        giftName={item.name}
        isSubmitting={isSubmitting}
      />
    </>
  );
};