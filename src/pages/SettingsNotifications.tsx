import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Flame, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";

const SettingsNotifications = () => {
  const navigate = useNavigate();
  const [dailyReminders, setDailyReminders] = useState(true);
  const [reminderTime, setReminderTime] = useState("09:00");
  const [frequency, setFrequency] = useState("weekdays");

  const currentStreak = 7;
  const totalAtomsCompleted = 23;
  const totalAtoms = 50;
  const longestStreak = 14;
  const completionPercentage = (totalAtomsCompleted / totalAtoms) * 100;

  const handleCalendarAdd = (provider: string) => {
    toast.success(`Calendar invite sent for ${provider}!`);
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="pt-32 pb-20 px-6">
          <div className="mx-auto max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>

            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-4 tracking-tight">
                Build Your AI Fluency Habit
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Set up daily reminders and track your learning progress
              </p>
            </div>

            <div className="space-y-8">
              {/* NOTIFICATION PREFERENCES CARD */}
              <div className="glass-card rounded-3xl p-8 shadow-xl animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6">
                  Notification Preferences
                </h2>
                
                <div className="space-y-6">
                  {/* Daily Reminders Toggle */}
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div>
                      <h3 className="font-medium mb-1">Daily Atom Reminders</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified when it's time for your daily 2-minute learning
                      </p>
                    </div>
                    <Switch
                      checked={dailyReminders}
                      onCheckedChange={setDailyReminders}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  {/* Time Picker */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <label className="font-medium">Send me atoms at:</label>
                    </div>
                    <Select value={reminderTime} onValueChange={setReminderTime}>
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-50">
                        <SelectItem value="07:00">7:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Frequency */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <label className="font-medium">Frequency:</label>
                    </div>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border z-50">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekdays">Every weekday</SelectItem>
                        <SelectItem value="custom">Custom schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleSaveSettings}
                    className="w-full button-primary mt-6"
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>

              {/* CALENDAR INTEGRATION CARD */}
              <div className="glass-card rounded-3xl p-8 shadow-xl animate-fade-in" style={{ animationDelay: "100ms" }}>
                <h2 className="text-2xl font-semibold mb-6">
                  Calendar Integration
                </h2>

                {/* Calendar Invite Preview */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 mb-6 border-2 border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        Your Daily 2-Minute AI Atom
                      </h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {reminderTime === "09:00" ? "9:00 AM - 9:02 AM" : 
                           reminderTime === "07:00" ? "7:00 AM - 7:02 AM" :
                           reminderTime === "08:00" ? "8:00 AM - 8:02 AM" :
                           reminderTime === "10:00" ? "10:00 AM - 10:02 AM" :
                           reminderTime === "12:00" ? "12:00 PM - 12:02 PM" :
                           reminderTime === "14:00" ? "2:00 PM - 2:02 PM" :
                           reminderTime === "17:00" ? "5:00 PM - 5:02 PM" :
                           "7:00 PM - 7:02 PM"}
                        </p>
                        <p className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Recurring: {frequency === "daily" ? "Every day" : 
                                     frequency === "weekdays" ? "Every weekday" : 
                                     "Custom schedule"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calendar Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => handleCalendarAdd("Google Calendar")}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4"
                  >
                    <span className="text-2xl">📅</span>
                    <span className="font-medium">Add to Google Calendar</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleCalendarAdd("Outlook")}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4"
                  >
                    <span className="text-2xl">📧</span>
                    <span className="font-medium">Add to Outlook</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleCalendarAdd("Apple Calendar")}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4"
                  >
                    <span className="text-2xl">🍎</span>
                    <span className="font-medium">Add to Apple Calendar</span>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  We'll send you a calendar invite with your daily atom link
                </p>
              </div>

              {/* LEARNING STREAK TRACKER */}
              <div className="glass-card rounded-3xl p-8 shadow-xl animate-fade-in" style={{ animationDelay: "200ms" }}>
                <h2 className="text-2xl font-semibold mb-6">
                  Learning Streak Tracker
                </h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-2xl p-6 border-2 border-orange-500/20 text-center">
                    <div className="text-5xl mb-2">🔥</div>
                    <p className="text-3xl font-bold mb-1">{currentStreak}</p>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border-2 border-primary/20 text-center">
                    <div className="text-5xl mb-2">✨</div>
                    <p className="text-3xl font-bold mb-1">{totalAtomsCompleted}/{totalAtoms}</p>
                    <p className="text-sm text-muted-foreground">Atoms Completed</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-6 border-2 border-green-500/20 text-center">
                    <div className="text-5xl mb-2">🏆</div>
                    <p className="text-3xl font-bold mb-1">{longestStreak}</p>
                    <p className="text-sm text-muted-foreground">Longest Streak</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-muted-foreground">{totalAtomsCompleted} of {totalAtoms}</span>
                  </div>
                  <Progress value={completionPercentage} className="h-3" />
                  <p className="text-center font-medium text-primary">
                    You're {completionPercentage.toFixed(0)}% of the way to AI fluency!
                  </p>
                </div>

                {/* Motivational CTA */}
                <div className="mt-8 text-center">
                  <Button
                    onClick={() => navigate("/atoms")}
                    size="lg"
                    className="button-primary px-8"
                  >
                    Continue Learning
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SettingsNotifications;
