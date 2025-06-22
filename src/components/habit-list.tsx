import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { 
  Box, 
  Button, 
  LinearProgress, 
  Paper, 
  Typography, 
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { toggleHabit, removeHabit, type Habit } from "../store/habit-slice";

const HabitList: React.FC = () => {
  const { habits, isLoading } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];
  
  // State for confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    habitId: string | null;
    habitName: string;
  }>({
    open: false,
    habitId: null,
    habitName: ""
  });

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const getCompletionPercentage = (habit: Habit) => {
    const streak = getStreak(habit);
    const maxStreak = habit.frequency === "daily" ? 30 : 4; // 30 days for daily, 4 weeks for weekly
    return Math.min((streak / maxStreak) * 100, 100);
  };

  const handleRemoveHabit = (habitId: string, habitName: string) => {
    setDeleteDialog({
      open: true,
      habitId,
      habitName
    });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.habitId) {
      dispatch(removeHabit(deleteDialog.habitId));
    }
    setDeleteDialog({
      open: false,
      habitId: null,
      habitName: ""
    });
  };

  const handleCancelDelete = () => {
    setDeleteDialog({
      open: false,
      habitId: null,
      habitName: ""
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography>Loading habits...</Typography>
      </Box>
    );
  }

  if (habits.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 4 }}>
        No habits found. Start by adding your first habit!
      </Alert>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
      {habits.map((habit) => {
        const isCompleted = habit.completedDates.includes(today);
        const streak = getStreak(habit);
        const completionPercentage = getCompletionPercentage(habit);

        return (
          <Paper 
            key={habit.id} 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                elevation: 6,
                transform: "translateY(-2px)"
              },
              border: isCompleted ? "2px solid #4caf50" : "1px solid #e0e0e0"
            }}
          >
            <Grid container spacing={2} alignItems="center">
              {/* Habit Info */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: isCompleted ? "#4caf50" : "text.primary"
                    }}
                  >
                    {habit.name}
                  </Typography>
                  {isCompleted && (
                    <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 20 }} />
                  )}
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Chip 
                    label={habit.frequency} 
                    size="small" 
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                  />
                  {streak > 0 && (
                    <Chip 
                      icon={<LocalFireDepartmentIcon />}
                      label={`${streak} day${streak > 1 ? 's' : ''} streak`}
                      size="small"
                      color="warning"
                      variant="filled"
                    />
                  )}
                </Box>
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "flex-start", md: "flex-end" },
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap"
                  }}
                >
                  <Button
                    variant={isCompleted ? "contained" : "outlined"}
                    color={isCompleted ? "success" : "primary"}
                    startIcon={
                      isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />
                    }
                    onClick={() =>
                      dispatch(
                        toggleHabit({
                          id: habit.id,
                          date: today,
                        })
                      )
                    }
                    sx={{ 
                      minWidth: 140,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 500
                    }}
                  >
                    {isCompleted ? "Completed" : "Mark Done"}
                  </Button>
                  
                  <Tooltip title="Remove habit">
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveHabit(habit.id, habit.name)}
                      sx={{ 
                        borderRadius: 2,
                        "&:hover": {
                          backgroundColor: "rgba(244, 67, 54, 0.1)"
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>

            {/* Progress Section */}
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {completionPercentage.toFixed(0)}%
                </Typography>
              </Box>
              
              <LinearProgress
                variant="determinate"
                value={completionPercentage}
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    backgroundColor: streak > 7 ? "#4caf50" : streak > 3 ? "#ff9800" : "#2196f3"
                  }
                }}
              />
              
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                {habit.frequency === "daily" 
                  ? `Target: 30 days | Current streak: ${streak} days`
                  : `Target: 4 weeks | Current streak: ${streak} days`
                }
              </Typography>
            </Box>
          </Paper>
        );
      })}
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 1
          }
        }}
      >
        <DialogTitle sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 1.5,
          color: "#f44336",
          fontWeight: 600
        }}>
          <WarningAmberIcon sx={{ color: "#f44336" }} />
          Confirm Delete
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText sx={{ fontSize: "1rem", color: "text.primary" }}>
            Are you sure you want to remove the habit{" "}
            <Typography component="span" sx={{ fontWeight: 600, color: "#f44336" }}>
              "{deleteDialog.habitName}"
            </Typography>
            ?
          </DialogContentText>
          <DialogContentText sx={{ mt: 1, fontSize: "0.9rem", color: "text.secondary" }}>
            This action cannot be undone. All progress and streak data will be permanently lost.
          </DialogContentText>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button 
            onClick={handleCancelDelete}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: "none",
              minWidth: 80
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{ 
              borderRadius: 2,
              textTransform: "none",
              minWidth: 80,
              fontWeight: 600
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HabitList;