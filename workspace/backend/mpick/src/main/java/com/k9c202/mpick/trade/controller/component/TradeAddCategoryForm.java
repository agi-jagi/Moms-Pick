package com.k9c202.mpick.trade.controller.component;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@SuperBuilder
@NoArgsConstructor
public class TradeAddCategoryForm {

    private HashMap<String, List<String>> category;

//    public void putCategory(String newKey, List<String> newValue) {
//        this.category.put(newKey, newValue);
//    }

    public void putCategory(String newKey, List<String> newValue) {
        if (this.category == null) {
            this.category = new HashMap<>();
        }

        if (newValue == null) {
            newValue = new ArrayList<>();
        }

        this.category.put(newKey, newValue);
    }
}
