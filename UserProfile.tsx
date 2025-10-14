import { useState } from 'react'
import { User, LogOut, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

export const UserProfile = () => {
  const { user, signOut, updateProfile, clearUserData } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '')
  const [loading, setLoading] = useState(false)
  const [clearing, setClearing] = useState(false)

  if (!user) return null

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await updateProfile({ full_name: fullName })
    if (!error) {
      setIsEditing(false)
    }
    setLoading(false)
  }

  const handleClearData = async () => {
    setClearing(true)
    try {
      const { error } = await clearUserData()
      if (error) {
        toast.error('Failed to clear data: ' + error.message)
      } else {
        toast.success('All food data cleared successfully')
      }
    } catch (error) {
      toast.error('An error occurred while clearing your data')
    } finally {
      setClearing(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="text-lg">
              {user.user_metadata?.full_name 
                ? getInitials(user.user_metadata.full_name)
                : <User size={24} />
              }
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl">
          {user.user_metadata?.full_name || 'User'}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-2">
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Edit2 size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? 'Updating...' : 'Save Changes'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            
            <Button variant="destructive" onClick={signOut}>
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                <Trash2 size={16} className="mr-2" />
                Clear All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear All Data</AlertDialogTitle>
                <AlertDialogDescription className="space-y-2">
                  <p>Are you sure you want to clear all your food inventory data?</p>
                  <p className="font-medium">This action will:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Delete all your food inventory items</li>
                    <li>Clear your expiration tracking history</li>
                    <li>Reset your food statistics</li>
                  </ul>
                  <p className="text-muted-foreground">Your profile and account settings will remain intact.</p>
                  <p className="text-destructive font-medium">This action cannot be undone.</p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearData}
                  disabled={clearing}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {clearing ? 'Clearing...' : 'Clear All Data'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="text-sm text-muted-foreground text-center">
          Member since {new Date(user.created_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )
}