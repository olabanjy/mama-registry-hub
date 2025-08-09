import { useState, useMemo } from 'react';
import { Heart, Gift, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GiftCard, type GiftItem, type ClaimData } from '@/components/GiftCard';
import { FilterSection } from '@/components/FilterSection';
import { useToast } from '@/hooks/use-toast';
import { sampleGifts, mockClaims } from '@/data/sampleGifts';
import heroImage from '@/assets/hero-baby-gifts.jpg';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [claims, setClaims] = useState<ClaimData[]>(mockClaims);
  const { toast } = useToast();

  // Filter gifts based on search and category
  const filteredGifts = useMemo(() => {
    return sampleGifts.filter(gift => {
      const matchesSearch = gift.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           gift.note.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || gift.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Mock claim function - in real app this would use Supabase
  const handleClaim = async (itemId: number, claimerName: string, claimerEmail: string, note?: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if already claimed (race condition simulation)
      if (claims.some(claim => claim.item_id === itemId)) {
        throw new Error('This gift has already been claimed by someone else!');
      }

      // Add new claim
      const newClaim: ClaimData = {
        item_id: itemId,
        claimer_name: claimerName,
        claimer_email: claimerEmail,
        created_at: new Date().toISOString()
      };

      setClaims(prev => [...prev, newClaim]);
      
      toast({
        title: "Gift claimed successfully! 🎉",
        description: `Thank you ${claimerName.split(' ')[0]}! We've saved your claim.`,
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: error instanceof Error ? error.message : "Please try again in a moment.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left space-y-6 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-celebration-light px-4 py-2 rounded-full text-sm font-medium text-celebration">
                  <Heart className="w-4 h-4 animate-gentle-bounce" />
                  Baby Shower Celebration
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Baby Gift Registry for{' '}
                  <span className="bg-gradient-celebration bg-clip-text text-transparent">
                    Adunni & Kemi
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
                  Baby shower in Lagos, Nigeria — thank you for celebrating with us!
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Gift className="w-5 h-5 text-celebration" />
                  How it works
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pick a gift, tap "Claim", leave your name & email. We'll mark it as taken so others don't duplicate. Simple! 💕
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-celebration hover:shadow-soft transition-all duration-300 rounded-xl px-8"
                  onClick={() => document.getElementById('gifts')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Browse Gifts
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-xl border-celebration-light hover:bg-celebration-light"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Share Registry
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative rounded-2xl overflow-hidden shadow-hover">
                <img
                  src={heroImage}
                  alt="Beautiful baby gifts arrangement"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-celebration/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-card">
                <div className="text-sm text-muted-foreground">Total Gifts</div>
                <div className="text-2xl font-bold text-celebration">{sampleGifts.length}</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-sage-light rounded-2xl p-4 shadow-card">
                <div className="text-sm text-muted-foreground">Claimed</div>
                <div className="text-2xl font-bold text-sage">{claims.length}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white/60 backdrop-blur-sm border-y border-celebration-light">
        <div className="container mx-auto px-4 py-8">
          <FilterSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            currency={currency}
            onCurrencyChange={setCurrency}
          />
        </div>
      </section>

      {/* Gifts Grid */}
      <section id="gifts" className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose Your Perfect Gift
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {filteredGifts.length} gifts available {selectedCategory !== 'All' && `in ${selectedCategory}`}
            </p>
          </div>

          {filteredGifts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Gift className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No gifts found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGifts.map((gift) => {
                const claim = claims.find(c => c.item_id === gift.id);
                return (
                  <div key={gift.id} className="animate-fade-in">
                    <GiftCard
                      item={gift}
                      claim={claim}
                      currency={currency}
                      onClaim={handleClaim}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-gradient-celebration rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Thank You for Celebrating With Us!</h3>
              <p className="text-background/80 max-w-2xl mx-auto">
                Your presence at our baby shower means the world to us. Every gift, whether big or small, 
                is a blessing that will help welcome our little one with love.
              </p>
            </div>

            <div className="bg-background/10 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-sm text-background/70 mb-3">
                📧 Emails are used only to mark gifts as claimed. We respect your privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm">
                <a 
                  href="mailto:registry@example.com" 
                  className="flex items-center gap-2 text-celebration-light hover:text-celebration transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  registry@example.com
                </a>
                <span className="hidden sm:inline text-background/50">•</span>
                <a 
                  href="tel:+2348012345678" 
                  className="flex items-center gap-2 text-celebration-light hover:text-celebration transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +234 801 234 5678
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-background/20">
              <p className="text-sm text-background/60">
                Made with 💕 for Adunni & Kemi's little miracle
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
