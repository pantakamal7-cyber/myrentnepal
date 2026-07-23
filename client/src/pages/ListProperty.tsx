const handleSubmit = async () => {
  if (!form.broker_confirmed) {
    toast.error("You must confirm the broker-free pledge to list on MYRENT.");
    return;
  }

  // Validate required fields
  if (!form.title || !form.price || !form.property_type || !form.location) {
    toast.error("Please fill in all required fields.");
    return;
  }

  try {
    // Insert ALL form data into Supabase
    const { data, error } = await supabase
      .from('Listing') 
      .insert([
        {
          // Contact info
          full_name: form.full_name,
          phone: form.phone,
          email: form.email || null,
          
          // Property details
          title: form.title,
          property_type: form.property_type,
          location: form.location,
          exact_address: form.exact_address,
          price_npr: Number(form.price), // Changed from 'price' to 'price_npr'
          deposit: form.deposit ? Number(form.deposit) : null,
          bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
          bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
          area_sqft: form.area ? Number(form.area) : null,
          description: form.description,
          
          // Utilities
          water_availability: form.water,
          parking_bike: form.parking_bike,
          parking_car: form.parking_car,
          submeter: form.submeter,
          
          // Amenities & verification
          amenities: form.amenities,
          doc_type: form.doc_type,
          is_broker_free: form.broker_confirmed,
          is_verified: false,
          availability_status: "Available",
        }
      ]);

    if (error) {
      console.error("Supabase Error:", error.message);
      toast.error("Database error: " + error.message);
      return;
    }

    setSubmitted(true);
    toast.success("Listing submitted for verification!", {
      description: "Our team will review your documents within 24-48 hours.",
    });

  } catch (err) {
    console.error("Error:", err);
    toast.error("An unexpected error occurred during submission.");
  }
};
