import { 
  ref, 
  push, 
  get, 
  update, 
  remove
} from 'firebase/database';
import { db } from '@/lib/firebase';

export const createTimeCapsule = async (timeCapsule) => {
  try {
    console.log('Starting time capsule creation...');
    console.log('Creating time capsule in Realtime Database...');
    console.log('User ID:', timeCapsule.userId);
    
    // Create time capsule in Realtime Database
    const timeCapsulesRef = ref(db, 'timeCapsules');
    const newCapsuleRef = push(timeCapsulesRef, {
      ...timeCapsule,
      unlockDate: timeCapsule.unlockDate.toISOString(),
      createdAt: new Date().toISOString(),
      files: [], // Empty array since we're not using file uploads
      isUnlocked: false
    });

    console.log('Time capsule created successfully with ID:', newCapsuleRef.key);
    return newCapsuleRef.key;
  } catch (error) {
    console.error('Error creating time capsule:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        throw new Error('Permission denied. Please make sure Realtime Database security rules are configured correctly.');
      } else if (error.message.includes('unavailable')) {
        throw new Error('Realtime Database is unavailable. Please check your internet connection and Firebase setup.');
      } else if (error.message.includes('lock')) {
        throw new Error('Database is in lock mode. Please check your Firebase Console rules and authentication.');
      }
    }
    
    throw new Error(`Failed to create time capsule: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getUserTimeCapsules = async (userId) => {
  try {
    // Use a simpler approach - get all capsules and filter in JavaScript
    const timeCapsulesRef = ref(db, 'timeCapsules');
    const snapshot = await get(timeCapsulesRef);
    const timeCapsules = [];
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      Object.keys(data).forEach((key) => {
        const capsule = data[key];
        // Only include capsules that belong to this user
        if (capsule.userId === userId) {
          timeCapsules.push({
            id: key,
            title: capsule.title,
            description: capsule.description,
            unlockDate: new Date(capsule.unlockDate),
            createdAt: new Date(capsule.createdAt),
            userId: capsule.userId,
            files: capsule.files || [],
            isUnlocked: capsule.isUnlocked || false
          });
        }
      });
    }
    
    // Sort by creation date (newest first)
    timeCapsules.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return timeCapsules;
  } catch (error) {
    console.error('Error fetching time capsules:', error);
    throw error;
  }
};

export const updateTimeCapsule = async (timeCapsuleId, updates) => {
  try {
    const timeCapsuleRef = ref(db, `timeCapsules/${timeCapsuleId}`);
    const updateData = { ...updates };
    
    // Convert Date objects to strings
    if (updates.unlockDate) {
      updateData.unlockDate = updates.unlockDate.toISOString();
    }
    
    await update(timeCapsuleRef, updateData);
  } catch (error) {
    console.error('Error updating time capsule:', error);
    throw error;
  }
};

export const deleteTimeCapsule = async (timeCapsuleId) => {
  try {
    const timeCapsuleRef = ref(db, `timeCapsules/${timeCapsuleId}`);
    await remove(timeCapsuleRef);
  } catch (error) {
    console.error('Error deleting time capsule:', error);
    throw error;
  }
};

export const checkAndUnlockCapsules = async (userId) => {
  try {
    const timeCapsules = await getUserTimeCapsules(userId);
    const now = new Date();
    const unlockedCapsules = [];
    
    for (const capsule of timeCapsules) {
      if (!capsule.isUnlocked && capsule.unlockDate <= now) {
        await updateTimeCapsule(capsule.id, { isUnlocked: true });
        unlockedCapsules.push({ ...capsule, isUnlocked: true });
      }
    }
    
    return unlockedCapsules;
  } catch (error) {
    console.error('Error checking unlocked capsules:', error);
    throw error;
  }
};

export const unlockTimeCapsule = async (timeCapsuleId) => {
  try {
    await updateTimeCapsule(timeCapsuleId, { isUnlocked: true });
    return true;
  } catch (error) {
    console.error('Error unlocking time capsule:', error);
    throw error;
  }
};
