import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  Typography,
  Fade,
  Slide,
  Alert,
  Snackbar,
  IconButton,
  Chip,
  InputAdornment,
  FormHelperText
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { addHabit } from "../store/habit-slice";
import AddIcon from "@mui/icons-material/Add";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RepeatIcon from "@mui/icons-material/Repeat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const AddHabitForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [nameError, setNameError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Habit suggestions
  const habitSuggestions = {
    daily: [
      "Drink 8 glasses of water",
      "Exercise for 30 minutes",
      "Read for 20 minutes",
      "Meditate for 10 minutes",
      "Write in journal",
      "Take vitamins",
      "Walk 10,000 steps",
      "Practice gratitude"
    ],
    weekly: [
      "Clean the house",
      "Plan meals for the week",
      "Review weekly goals",
      "Call family/friends",
      "Grocery shopping",
      "Declutter one area",
      "Learn something new",
      "Digital detox day"
    ]
  };

  // Validation
  const validateName = (value: string): string => {
    if (!value.trim()) {
      return "Habit name is required";
    }
    if (value.trim().length < 3) {
      return "Habit name must be at least 3 characters";
    }
    if (value.trim().length > 50) {
      return "Habit name must be less than 50 characters";
    }
    return "";
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateName(name);
    if (error) {
      setNameError(error);
      nameInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay for better UX
    setTimeout(() => {
      dispatch(addHabit({ name: name.trim(), frequency }));
      setName("");
      setNameError("");
      setIsSubmitting(false);
      setShowSuccess(true);
      setShowSuggestions(false);
      
      // Auto-hide success message
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setName(suggestion);
    setNameError("");
    setShowSuggestions(false);
    nameInputRef.current?.focus();
  };

  const handleClear = () => {
    setName("");
    setNameError("");
    nameInputRef.current?.focus();
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  // Auto-focus on mount
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Fade in timeout={800}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1
            }}
          >
            Build Better Habits
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Start your journey to a better you, one habit at a time
          </Typography>
        </Box>
      </Fade>

      {/* Main Form */}
      <Slide direction="up" in timeout={1000}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
            border: "1px solid rgba(33, 150, 243, 0.1)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "linear-gradient(90deg, #2196F3, #21CBF3, #4CAF50, #FF9800)",
              backgroundSize: "300% 100%",
              animation: "gradient 3s ease infinite",
            },
            "@keyframes gradient": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" }
            }
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              
              {/* Habit Name Input */}
              <Box>
                <TextField
                  inputRef={nameInputRef}
                  label="Habit Name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g., Drink 8 glasses of water"
                  fullWidth
                  error={!!nameError}
                  helperText={nameError || "Give your habit a clear, specific name"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TrackChangesIcon sx={{ color: "#2196F3" }} />
                      </InputAdornment>
                    ),
                    endAdornment: name && (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClear} size="small">
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#2196F3",
                          borderWidth: "2px"
                        }
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#2196F3",
                          borderWidth: "2px",
                          boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.1)"
                        }
                      }
                    }
                  }}
                />
                
                {/* Suggestions Button */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                  <Button
                    startIcon={<LightbulbIcon />}
                    onClick={toggleSuggestions}
                    size="small"
                    sx={{ 
                      textTransform: "none",
                      color: "#2196F3",
                      "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.05)" }
                    }}
                  >
                    {showSuggestions ? "Hide suggestions" : "Need inspiration?"}
                  </Button>
                  <Typography variant="caption" color="text.secondary">
                    {name.length}/50 characters
                  </Typography>
                </Box>
              </Box>

              {/* Habit Suggestions */}
              {showSuggestions && (
                <Fade in timeout={300}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: "rgba(33, 150, 243, 0.03)", 
                    borderRadius: 2,
                    border: "1px solid rgba(33, 150, 243, 0.1)"
                  }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: "#2196F3", fontWeight: 600 }}>
                      Popular {frequency} habits:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {habitSuggestions[frequency].map((suggestion, index) => (
                        <Chip
                          key={index}
                          label={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: "#2196F3",
                            color: "#2196F3",
                            "&:hover": {
                              backgroundColor: "#2196F3",
                              color: "white",
                              transform: "translateY(-1px)"
                            },
                            transition: "all 0.2s ease",
                            cursor: "pointer"
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Fade>
              )}

              {/* Frequency Selection */}
              <FormControl fullWidth>
                <InputLabel sx={{ "&.Mui-focused": { color: "#2196F3" } }}>
                  Frequency
                </InputLabel>
                <Select
                  value={frequency}
                  label="Frequency"
                  onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
                  startAdornment={
                    <InputAdornment position="start">
                      <RepeatIcon sx={{ color: "#2196F3", mr: 1 }} />
                    </InputAdornment>
                  }
                  sx={{
                    borderRadius: 2,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#2196F3",
                      borderWidth: "2px",
                      boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.1)"
                    }
                  }}
                >
                  <MenuItem value="daily">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarTodayIcon fontSize="small" />
                      <Box>
                        <Typography variant="body2">Daily</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Every day
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value="weekly">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <RepeatIcon fontSize="small" />
                      <Box>
                        <Typography variant="body2">Weekly</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Once a week
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                </Select>
                <FormHelperText>
                  Choose how often you want to perform this habit
                </FormHelperText>
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting || !!nameError || !name.trim()}
                startIcon={isSubmitting ? null : <AddIcon />}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  boxShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)",
                    boxShadow: "0 6px 25px rgba(33, 150, 243, 0.4)",
                    transform: "translateY(-2px)"
                  },
                  "&:disabled": {
                    background: "#e0e0e0",
                    boxShadow: "none",
                    transform: "none"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                {isSubmitting ? "Adding Habit..." : "Add Habit"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Slide>

      {/* Success Message */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          icon={<CheckCircleIcon />}
          sx={{
            borderRadius: 2,
            "& .MuiAlert-icon": {
              color: "#4CAF50"
            }
          }}
        >
          Habit added successfully! 🎉 Keep it up!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddHabitForm;